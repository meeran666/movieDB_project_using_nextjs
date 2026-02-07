import { DefaultSession } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

// Extend the default JWT type
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends DefaultJWT {
    id: string;
    llmTokens: number;
    requests: number;
    isVerified?: boolean;
    email: string;
    name?: string;
  }
}

// Extend the default Session type to include your custom properties
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      llmTokens: number;
      requests: number;
      name?: string;
      email: string;
    } & DefaultSession["user"];
  }

  // Optionally extend the User type
  // interface User extends DefaultUser {
  interface User {
    id: string;
    llmTokens: number;
    requests: number;
    name?: string;
    email: string;
    isVerified?: boolean;
  }
}
