import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";

export default function ReactQuery({ children }: { children: ReactNode }) {
  // Create a client
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
}
