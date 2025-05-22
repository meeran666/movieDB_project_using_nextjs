import { NextAuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import getDatabaseConection from "@/lib/db";
import { authTable } from "@/src/drizzle/models";
import { eq, or } from "drizzle-orm";
// import Google from "next-auth/providers/google";
import GoogleProvider from "next-auth/providers/google";
const db = await getDatabaseConection();
export const authOptions: NextAuthOptions = {
  providers: [
    // Google,
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // async authorize(credentials: any): Promise<any> {
      //   console.log("credentials");
      //   console.log(credentials);
      //   // try {
      //   // } catch (err: any) {
      //   //   throw new Error(err);
      //   // }
      // },
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        console.log("inside the authorize functions");
        try {
          const user = await db
            .select()
            .from(authTable)
            .where(
              or(
                eq(authTable.email, credentials.identifier),
                eq(authTable.username, credentials.identifier),
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
            credentials.password,
            user[0].password,
          );
          if (isPasswordCorrect) {
            return user[0];
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
    //   console.log("profile");
    //   console.log(profile);
    //   // if (
    //   //   account?.provider === "google" &&
    //   //   profile?.name !== undefined &&
    //   //   profile?.email !== undefined &&
    //   //   profile?.exp !== undefined
    //   // ) {
    //   //   await db.insert(authTable).values({
    //   //     username: profile?.name,
    //   //     email: profile?.email,
    //   //     verifyCodeExpiry: profile?.exp,
    //   //     isVerified: true,
    //   //   });
    //   // }
    //   return "authenticated";
    // },
    async jwt({ token, user }: { token: JWT; user: User }) {
      console.log("token3");
      console.log(token);
      // console.log("user");
      // console.log(user);

      if (user) {
        token.id = user?.id?.toString(); // Convert ObjectId to string
        token.isVerified = user?.isVerified;
        token.username = user?.username;
        token.name = user?.name;
        token.email = user?.email;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user.id = token?.id;
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
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
  },
};
