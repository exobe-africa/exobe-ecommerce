"use client";

import { getApolloClient } from "../apollo/client";
import { RECORD_ANALYTICS_EVENT } from "../api/analytics";
import { useAuthStore } from "../../store/auth";

export type AnalyticsEventInput = {
  userId?: string;
  sessionId?: string;
  eventType: string;
  pagePath?: string;
  pageTitle?: string;
  referrer?: string;
  productId?: string;
  collectionId?: string;
  vendorId?: string;
  searchQuery?: string;
  durationMs?: number;
  scrollDepth?: number;
  attributes?: Record<string, unknown> | null;
  userAgent?: string;
  ip?: string;
  isNewSession?: boolean;
  occurredAt?: Date;
};

const SESSION_KEY = "exobe.analytics.sessionId";
const SESSION_LAST_TS = "exobe.analytics.lastTs";
const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes inactivity ends session

function getOrCreateSessionId(now: number): { sessionId: string; isNewSession: boolean } {
  try {
    const lastTsRaw = typeof window !== "undefined" ? window.localStorage.getItem(SESSION_LAST_TS) : null;
    const sessionRaw = typeof window !== "undefined" ? window.localStorage.getItem(SESSION_KEY) : null;
    const lastTs = lastTsRaw ? Number(lastTsRaw) : 0;
    const isExpired = !lastTs || now - lastTs > SESSION_TIMEOUT_MS;
    if (!sessionRaw || isExpired) {
      const sessionId = `sess_${Math.random().toString(36).slice(2)}_${now}`;
      if (typeof window !== "undefined") {
        window.localStorage.setItem(SESSION_KEY, sessionId);
        window.localStorage.setItem(SESSION_LAST_TS, String(now));
      }
      return { sessionId, isNewSession: true };
    }
    if (typeof window !== "undefined") {
      window.localStorage.setItem(SESSION_LAST_TS, String(now));
    }
    return { sessionId: sessionRaw, isNewSession: false };
  } catch {
    return { sessionId: `sess_${now}`, isNewSession: true };
  }
}

function getUserAgent(): string | undefined {
  if (typeof navigator !== "undefined") return navigator.userAgent;
  return undefined;
}

export async function recordEvent(input: Omit<AnalyticsEventInput, "userId" | "sessionId" | "isNewSession" | "userAgent"> & { anonymous?: boolean }) {
  const client = getApolloClient();
  const now = Date.now();
  const { sessionId, isNewSession } = getOrCreateSessionId(now);
  const user = useAuthStore.getState().user;
  const userId = user?.id;

  try {
    await client.mutate({
      mutation: RECORD_ANALYTICS_EVENT,
      variables: {
        input: {
          ...input,
          userId,
          sessionId,
          isNewSession,
          userAgent: getUserAgent(),
          occurredAt: new Date(now).toISOString(),
        },
        anonymous: !userId,
      },
    });
  } catch (_) { }
}


