"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth.tsx/auth";
import { Button } from "@/components/ui/Button";
import { LogIn } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function LoginPage() {
  const [role, setRole] = useState<"admin" | "editor">("editor");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    setLoading(true);
    login(role);
    router.push("/dashboard");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center px-4">
        <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl p-8 shadow-2xl w-full max-w-md text-white">
          <h2 className="text-3xl font-bold mb-6 text-center"> Login</h2>

          <label className="block mb-4">
            <span className="text-sm text-gray-200">Select Role</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as "admin" | "editor")}
              className="mt-1 w-full p-2 rounded bg-white/20 text-gray-700 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-300"
            >
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          <Button
            onClick={handleLogin}
            disabled={loading}
            className="w-full mt-4 flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white"
          >
            <LogIn size={18} />
            {loading ? "Logging in..." : `Login as ${role}`}
          </Button>
        </div>
      </div>
    </>
  );
}
