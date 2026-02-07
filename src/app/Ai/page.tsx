"use client";
import { SessionProvider } from "next-auth/react";
import AllAiApi from "./allAiApi";

export default function Page() {
  return (
    // <SessionProvider>
    <AllAiApi></AllAiApi>
    // </SessionProvider>
  );
}
