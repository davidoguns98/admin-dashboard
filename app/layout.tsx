import "./globals.css";
import { ReactNode } from "react";
import { ThemeProvider } from "@/context/Theme/ThemeContext";
import { AuthProvider } from "@/context/auth.tsx/auth";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
