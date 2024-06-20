import AdminHeader from "@/components/admin-header";
import Sidebar from "@/components/sidebar";
import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <AdminHeader />
          <div className="overflow-y-scroll h-[calc(100dvh-80px)] p-4">
            {children}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
