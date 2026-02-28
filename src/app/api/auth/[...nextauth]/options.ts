import { Account, NextAuthOptions, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import redis from "@/lib/redis";
import { authTable } from "@/src/drizzle/models";
import { eq, or } from "drizzle-orm";
import { LoginCredentials } from "@/types/types";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    // Google,
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: LoginCredentials | undefined,
      ): Promise<User | null> {
        if (!credentials) return null;
        try {
          const { identifier, password } = credentials;

          const user = await db
            .select()
            .from(authTable)
            .where(
              or(
                eq(authTable.email, identifier),
                eq(authTable.username, identifier),
              ),
            );

          if (user.length === 0) {
            throw new Error("No user found with this email");
          }
          if (!user[0].isVerified) {
            throw new Error("Please verify your account before logging in");
          }
          if (user[0].password === null) {
            throw new Error("error password is null");
          }

          const isPasswordCorrect = await bcrypt.compare(
            password,
            user[0].password,
          );
          if (isPasswordCorrect) {
            return {
              id: user[0].id,
              email: user[0].email,
              name: user[0].username ?? user[0].googleAuthUsername ?? undefined,
            };
          } else {
            throw new Error("rect password");
          }
        } catch (err: any) {
          console.error(err);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ account, profile, user }) {
      let id: string = "";
      id = user.id;

      if (account?.provider === "google") {
        try {
          if (profile?.email === undefined) {
            return false;
          }
          const inserted = await db
            .insert(authTable)
            .values({
              googleAuthUsername: profile?.name,
              email: profile.email,
              isVerified: true,
            })
            .onConflictDoUpdate({
              target: authTable.email,
              set: {
                googleAuthUsername: profile?.name,
                isVerified: true,
              },
            })
            .returning({ id: authTable.id });
          id = inserted[0].id;
          user.id = id;
        } catch (error) {
          console.error(error);
          return false;
        }
      }

      const day_passed = Date.now() % 86400000;
      const day_left = 86400000 - day_passed;
      let expire_time = Math.round(day_left / 1000);
      expire_time = expire_time + 86400;

      const exists_key = await redis.hgetall(id);
      if (Object.keys(exists_key).length === 0) {
        const requests = 5;
        const llmTokens = 2000;
        await redis
          .multi()
          .hset(id, {
            requests: requests,
            tokens: llmTokens,
          })
          .expire(user.id, expire_time)
          .exec();
        user.requests = requests;
        user.llmTokens = llmTokens;
      } else {
        user.llmTokens = Number(exists_key.tokens);
        user.requests = Number(exists_key.requests);
      }
      return true;
    },
    async jwt({
      token,
      user,
      trigger,
      session,
    }: {
      token: JWT;
      account: Account | null;
      user?: User;
      trigger?: "signUp" | "signIn" | "update";
      session?: {
        llmTokens: number;
        requests: number;
      };
    }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.llmTokens = user.llmTokens ?? 1900;
        token.requests = user.requests ?? 4;
      }

      //  Session update (useSession().update)
      if (trigger === "update" && session) {
        token.llmTokens = session.llmTokens;
        token.requests = session.requests;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        // session.
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.llmTokens = token.llmTokens;
        session.user.requests = token.requests;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 2,
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 2,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
  },
};
