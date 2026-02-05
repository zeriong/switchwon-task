import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

// SSR에서 싱글톤 QueryClient 제공 (React cache로 래핑)
const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
        },
      },
    }),
);

export default getQueryClient;
