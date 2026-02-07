"use client";
import "@/styles/globals.css";
import Dashboard from "./Dashboard";
import Footer from "./footer";
import { usePathname } from "next/navigation";
export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // const [isFooter, setIsFooter] = useState<boolean>(true);
  const pathname = usePathname();
  const isFooter = pathname !== "/movieDetail" && pathname !== "/Ai";
  return (
    <html lang="en" className="bg-(--black_color)">
      <body>
        <Dashboard>
          {children}
          {isFooter && <Footer />}
        </Dashboard>
      </body>
    </html>
  );
}
