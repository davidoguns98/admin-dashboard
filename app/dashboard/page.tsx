"use client";

import { useAuth } from "@/auth.tsx/auth";
import { useRouter } from "next/navigation";

export default function DashboardLanding() {
  const { role } = useAuth();
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-center p-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Welcome to the Dashboard
        </h1>
        {role ? (
          <>
            <p className="text-gray-700 dark:text-gray-300">
              You are logged in as <strong>{role}</strong>.
            </p>
            <button
              onClick={() => router.push(`/dashboard/${role}`)}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              Go to {role} Dashboard
            </button>
          </>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
          >
            Go to Login
          </button>
        )}
      </div>
    </div>
  );
}
