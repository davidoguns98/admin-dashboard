"use client";

import { useAuth } from "@/context/auth.tsx/auth";
import { useRouter } from "next/navigation";
import { useEffect, ComponentType } from "react";

interface WithAuthOptions {
  allowedRoles?: ("admin" | "editor")[];
}

export function withAuth<P>(
  Component: ComponentType<P>,
  options?: WithAuthOptions
) {
  return function ProtectedComponent(props: P) {
    const { role } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!role) {
        router.replace("/login");
        return;
      }

      if (options?.allowedRoles && !options.allowedRoles.includes(role)) {
        router.replace("/login");
      }
    }, [role]);

    if (
      !role ||
      (options?.allowedRoles && !options.allowedRoles.includes(role))
    ) {
      return null; // optional loading spinner here
    }

    return <Component {...props} />;
  };
}
