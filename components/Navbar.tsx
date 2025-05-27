"use client";

import { useAuth } from "@/auth.tsx/auth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { role, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const dashboardPath =
    role === "admin" ? "/dashboard/admin" : "/dashboard/editor";

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div
        className="text-xl font-semibold cursor-pointer"
        onClick={() => router.push(dashboardPath)}
      >
        Mini Admin Dashboard
      </div>
      <div className="flex items-center gap-4">
        {role && (
          <span className="bg-blue-800 px-3 py-1 rounded text-sm">
            Role: <strong>{role}</strong>
          </span>
        )}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
