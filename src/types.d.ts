// types/next-auth.d.ts or src/types/next-auth.d.ts
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      isVerified: boolean;
      username: string;
    };
  }

  interface User {
    username: string;
    isVerified: boolean;
    password: string; // You should **not** expose this to the session
  }

  interface JWT {
    id: string;
    username: string;
    isVerified: boolean;
  }
}
