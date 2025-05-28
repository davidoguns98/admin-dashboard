"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth.tsx/auth";

interface WithAuthOptions {
  allowedRoles?: ("admin" | "editor")[];
}

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options?: WithAuthOptions
): React.FC<P> {
  const ComponentWithAuth: React.FC<P> = (props) => {
    const { role } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!role) {
        router.replace("/login");
      } else if (
        options?.allowedRoles &&
        !options.allowedRoles.includes(role)
      ) {
        router.replace("/login");
      }
    }, [role, router]);

    if (
      !role ||
      (options?.allowedRoles && !options.allowedRoles.includes(role))
    ) {
      return null; // optionally show a spinner
    }

    return <WrappedComponent {...props} />;
  };

  ComponentWithAuth.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ComponentWithAuth;
}
