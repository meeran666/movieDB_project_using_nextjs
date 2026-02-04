// // types/next-auth.d.ts or src/types/next-auth.d.ts

// import { DefaultSession } from "next-auth";

// declare module "next-auth" {
//   interface Session extends DefaultSession {
//     user: {
//       id?: string;
//       isVerified?: boolean;
//       username?: string;
//       name?: string;
//       email?: string;
//     };
//   }

//   interface User {
//     id?: string;
//     username?: string;
//     isVerified?: boolean;
//     password?: string; // You should **not** expose this to the session
//     name?: string;
//     email?: string;
//   }
// }
// declare module "next-auth/jwt" {
//   interface JWT {
//     id?: string;
//     username?: string;
//     isVerified?: boolean;
//     name?: string;
//     email?: string;
//     exp?: string;
//   }
// }
