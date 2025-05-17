import { NextAuthOptions } from "next-auth";
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
    }),
    // CredentialsProvider({
    //   id: "credentials",
    //   name: "Credentials",
    //   credentials: {
    //     email: { label: "Email", type: "text" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials: any): Promise<any> {
    //     try {
    //       const user = await db
    //         .select()
    //         .from(authTable)
    //         .where(
    //           or(
    //             eq(authTable.email, credentials.identifier),
    //             eq(authTable.username, credentials.identifier),
    //           ),
    //         );

    //       if (user.length === 0) {
    //         throw new Error("No user found with this email");
    //       }
    //       if (!user[0].isVerified) {
    //         throw new Error("Please verify your account before logging in");
    //       }

    //       const isPasswordCorrect = await bcrypt.compare(
    //         credentials.password,
    //         user[0].password,
    //       );
    //       if (isPasswordCorrect) {
    //         return user[0];
    //       } else {
    //         throw new Error("Incorrect password");
    //       }
    //     } catch (err: any) {
    //       throw new Error(err);
    //     }
    //   },
    // }),
  ],
  // callbacks: {
  //   async jwt({ token, user }) {
  //     if (user) {
  //       token.id = user.id?.toString(); // Convert ObjectId to string
  //       token.isVerified = user.isVerified;
  //       token.username = user.username;
  //     }
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     if (token) {
  //       session.user.id = token.id;
  //       session.user.isVerified = token.isVerified;
  //       session.user.username = token.username;
  //     }
  //     return session;
  //   },
  // },
  // session: {
  //   strategy: "jwt",
  // },
  // secret: process.env.NEXTAUTH_SECRET,
  // pages: {
  //   signIn: "/sign-in",
  // },
};
