"use client";

import { useAuth } from "@/context/auth.tsx/auth";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { ArrowRight, LogIn } from "lucide-react";

export default function DashboardLanding() {
  const { role } = useAuth();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 to-indigo-800 text-white">
      <Navbar />
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-8 shadow-2xl w-full max-w-lg text-center space-y-6">
          <h1 className="text-3xl font-bold tracking-wide">
            Welcome to the Dashboard
          </h1>

          {role ? (
            <>
              <p className="text-lg text-white/80">
                You are logged in as{" "}
                <strong className="capitalize">{role}</strong>.
              </p>
              <button
                onClick={() => router.push(`/dashboard/${role}`)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 transition rounded-full text-white shadow-md"
              >
                Go to {role} Dashboard <ArrowRight size={18} />
              </button>
            </>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 transition rounded-full text-white shadow-md"
            >
              Go to Login <LogIn size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
