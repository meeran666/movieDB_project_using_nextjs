import { Account, NextAuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import redis from "@/lib/redis";
import { authTable } from "@/src/drizzle/models";
import { eq, or } from "drizzle-orm";

// import Google from "next-auth/providers/google";
import GoogleProvider from "next-auth/providers/google";
// const db = await getDatabaseConection();
type LoginCredentials = {
  identifier: string;
  password: string;
};

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
            const day_passed = Date.now() % 86400000;
            const day_left = 86400000 - day_passed;
            const expire_time = Math.round(day_left / 1000);
            const llmtoken = 2000;
            const requests = 5;

            // this is commentable for now
            // const id = user[0].id;
            // const exists_id = await redis.exists(id);
            // if (!exists_id) {
            //   const llmtoken = 2000;
            //   const requests = 5;
            //   const exists = await redis.exists(id);

            //   if (!exists) {
            //     await redis
            //       .multi()
            //       .hset(user[0].id, {
            //         requests: requests,
            //         tokens: llmtoken,
            //       })
            //       .expire(user[0].id, expire_time)
            //       .exec();
            //   }
            // }

            return {
              id: user[0].id,
              email: user[0].email,
              name: user[0].username ?? user[0].googleAuthUsername ?? undefined,
              llmTokens: llmtoken,
              requests: requests,
            };
          } else {
            throw new Error("Incorrect password");
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],

  callbacks: {
    // async signIn({ account, profile }) {
    //   console.log(account?.provider);
    //   if (
    //     account?.provider === "google" &&
    //     profile?.name !== undefined &&
    //     profile?.email !== undefined &&
    //     profile?.exp !== undefined
    //   ) {
    //     return true;
    //   }
    // },
    async jwt({
      token,
      account,
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
        token.llmTokens = user.llmTokens;
        token.requests = user.requests;
      }

      //  Session update (useSession().update)
      if (trigger === "update" && session) {
        console.log(session);
        token.llmTokens = session.llmTokens;
        token.requests = session.requests;
      }

      //  GUARANTEE fields always exist
      token.llmTokens ??= 0;
      token.requests ??= 0;
      // console.log("trigger");
      // console.log(trigger);
      if (account?.provider === "google" && trigger === "signIn") {
        try {
          const date = new Date(Date.now() + 172800);
          await db
            .insert(authTable)
            .values({
              googleAuthUsername: token?.name,
              email: token?.email,
              verifyCodeExpiry: date.toISOString(),
              isVerified: true,
            })
            .onConflictDoNothing();
        } catch (error) {
          console.error(error);
        }
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
