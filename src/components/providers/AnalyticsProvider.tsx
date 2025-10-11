"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { recordEvent } from "../../lib/analytics/client";
import { useAuthStore } from "../../store/auth";

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isAuthenticated, user } = useAuthStore();
  const lastPathRef = useRef<string | null>(null);

  useEffect(() => {
    const pathWithQuery = `${pathname}${searchParams?.toString() ? `?${searchParams.toString()}` : ""}`;
    if (lastPathRef.current === pathWithQuery) return;
    lastPathRef.current = pathWithQuery;

    if (isAuthenticated && user?.id) {
      // Fire page_view for logged-in users
      void recordEvent({
        eventType: "page_view",
        pagePath: pathWithQuery,
        pageTitle: typeof document !== "undefined" ? document.title : undefined,
        referrer: typeof document !== "undefined" ? document.referrer : undefined,
        attributes: null,
        anonymous: false,
      });
    }
  }, [pathname, searchParams, isAuthenticated, user?.id]);

  return children as React.ReactElement;
}


