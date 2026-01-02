"use client";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Dashboard from "./Dashboard";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Dashboard>{children}</Dashboard>
        </SessionProvider>
      </body>
    </html>
  );
}
