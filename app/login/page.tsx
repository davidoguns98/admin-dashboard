"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/auth.tsx/auth";

export default function LoginPage() {
  const [role, setRole] = useState<"admin" | "editor">("editor");
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    login(role);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <label className="block mb-4">
          <span className="text-gray-700">Select Role</span>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as "admin" | "editor")}
            className="mt-1 block w-full p-2 border rounded"
          >
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Login as {role}
        </button>
      </div>
    </div>
  );
}
