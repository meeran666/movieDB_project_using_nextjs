import { Account, NextAuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
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
        console.log("inside the authorize functions");
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
    }: {
      token: JWT;
      account: Account | null;
      user: User;
      trigger?: "signUp" | "signIn" | "update";
    }) {
      if (user) {
        token.id = user?.id?.toString();
        token.isVerified = user?.isVerified;
        token.username = user?.username;
        token.name = user?.name;
        token.email = user?.email;
      }

      if (account?.provider !== "google" && trigger !== "signIn") {
        return token;
      }
      try {
        if (token?.name !== undefined && token?.email !== undefined) {
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
        }
      } catch (error) {
        console.error(error);
      }

      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user.name = token?.name;
        session.user.email = token?.email;
        session.user.isVerified = token?.isVerified;
        session.user.username = token?.username;
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
