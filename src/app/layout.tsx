import "@/styles/globals.css";
import Dashboard from "./Dashboard";
import Footer from "./footer";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-(--black_color)">
      <body>
        <Dashboard>{children}</Dashboard>
      </body>
    </html>
  );
}
