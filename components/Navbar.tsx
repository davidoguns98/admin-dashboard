"use client";

import { useAuth } from "@/context/auth.tsx/auth";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/Theme/ThemeContext";
import { LogOut, User, Moon, Sun } from "lucide-react";

export default function Navbar() {
  const { role, logout } = useAuth();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav
      className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white px-6 py-4 
                flex justify-between items-center shadow-lg 
                dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900"
    >
      <div
        onClick={() => router.push("/login")}
        className="text-2xl font-bold tracking-wide cursor-pointer hover:opacity-90 transition"
      >
        DigiSigns
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          title="Toggle Theme"
          className="hover:opacity-75"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {role && (
          <div className="flex items-center gap-2 bg-purple-900/50 px-3 py-1 rounded-full text-sm shadow-sm">
            <User size={16} />
            <span className="capitalize">{role}</span>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-sm px-4 py-2 rounded-full transition shadow-md"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </nav>
  );
}
