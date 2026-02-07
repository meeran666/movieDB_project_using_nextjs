import { AuthUser } from "@/types/types";
import { DefaultSession } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

// Extend the default JWT type
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    llmTokens: number;
    requests: number;
    email: string;
    name?: string;
  }
}
// Extend the default Session type to include your custom properties
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      llmTokens: number;
      requests: number;
      name?: string;
      email: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    llmTokens: number;
    requests: number;
    email: string;
    name?: string;
  }
}
