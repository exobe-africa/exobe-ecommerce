"use client";

import { useEffect } from "react";
import { useAuthStore } from "../../store/auth";

export default function AuthBootstrap() {
  const { isAuthenticated, fetchMe, hasHydrated } = useAuthStore();

  useEffect(() => {
    if (!hasHydrated) return;
    if (!isAuthenticated) {
      // Fire-and-forget to populate user from cookie session
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fetchMe();
    }
  }, [hasHydrated, isAuthenticated, fetchMe]);

  return null;
}


