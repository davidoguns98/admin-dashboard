"use client";

import { useAuth } from "@/auth.tsx/auth";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";

export default function Navbar() {
  const { role, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white px-6 py-4 flex justify-between items-center shadow-lg">
      <div
        onClick={() => router.push("/login")}
        className="text-2xl font-bold tracking-wide cursor-pointer hover:opacity-90 transition"
      >
        DigiSigns Admin
      </div>

      <div className="flex items-center gap-4">
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
