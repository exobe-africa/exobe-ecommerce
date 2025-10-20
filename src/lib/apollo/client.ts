"use client";

import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useAuthStore } from "../../store/auth";
import { onError } from "@apollo/client/link/error";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/graphql";

let apolloClient: ApolloClient | null = null;

function createApolloClient() {
  const errorLink = onError((err) => {
    const graphQLErrors = (err as any).graphQLErrors as { message?: string }[] | undefined;
    const networkError = (err as any).networkError as unknown;
    if (graphQLErrors) {
      for (const e of graphQLErrors) {
        // Optional: route on auth errors; store handles redirects
        if (typeof window !== "undefined" && e?.message && /unauthorized|forbidden/i.test(e.message)) {
          // Best-effort: let store handle state cleanup
          try {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            fetch(API_URL, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ query: "mutation{ logout }" }),
              credentials: "include",
            });
          } catch (_) {}
        }
      }
    }
    if (networkError) {
      // No-op; UI can show generic error
    }
  });

  const httpLink = new HttpLink({
    uri: API_URL,
    credentials: "include",
    fetchOptions: { credentials: "include" },
  });

  const authLink = setContext((_, { headers }) => {
    const token = useAuthStore.getState().user?.token;
    console.log('Apollo authLink - token:', token);
    console.log('Apollo authLink - user:', useAuthStore.getState().user);
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  return new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
  });
}

export function getApolloClient() {
  if (!apolloClient) {
    apolloClient = createApolloClient();
  }
  return apolloClient;
}


