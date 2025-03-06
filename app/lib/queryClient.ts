// import { QueryClient, QueryFunction } from "@tanstack/react-query"

// async function throwIfResNotOk(res: Response) {
//   if (!res.ok) {
//     const text = (await res.text()) || res.statusText;
//     throw new Error(`${res.status}: ${text}`);
//   }
// }

// export async function apiRequest(
//   method: string,
//   url: string,
//   data?: unknown | undefined,
// ): Promise<Response> {
//   const res = await fetch(url, {
//     method,
//     headers: data ? {
//           'apikey' : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxcWtjZXJnendsZmJmbXlyaWpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1MzQ3MzYsImV4cCI6MjA1NTExMDczNn0.4yEJaQJlmA5mNfuId6jVRjlCI8bhyrdTJLo4vd0Fpfo`,
//           'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxcWtjZXJnendsZmJmbXlyaWpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1MzQ3MzYsImV4cCI6MjA1NTExMDczNn0.4yEJaQJlmA5mNfuId6jVRjlCI8bhyrdTJLo4vd0Fpfo`, // Include your access token if needed
//           'Content-Type': 'application/json',
//       } : {},
//     body: data ? JSON.stringify(data) : undefined,
//     credentials: "include",
//   });

//   await throwIfResNotOk(res);
//   return res;
// }

// type UnauthorizedBehavior = "returnNull" | "throw";
// export const getQueryFn: <T>(options: {
//   on401: UnauthorizedBehavior;
// }) => QueryFunction<T> =
//   ({ on401: unauthorizedBehavior }) =>
//   async ({ queryKey }) => {
//     const res = await fetch(queryKey[0] as string, {
//       credentials: "include",
//     });

//     if (unauthorizedBehavior === "returnNull" && res.status === 401) {
//       return null;
//     }

//     await throwIfResNotOk(res);
//     return await res.json();
//   };

// export const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       queryFn: getQueryFn({ on401: "throw" }),
//       refetchInterval: false,
//       refetchOnWindowFocus: false,
//       staleTime: Infinity,
//       retry: false,
//     },
//     mutations: {
//       retry: false,
//     },
//   },
// });
import { QueryClient, QueryFunction } from "@tanstack/react-query"

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers:{
          'apikey' : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxcWtjZXJnendsZmJmbXlyaWpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1MzQ3MzYsImV4cCI6MjA1NTExMDczNn0.4yEJaQJlmA5mNfuId6jVRjlCI8bhyrdTJLo4vd0Fpfo`,
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxcWtjZXJnendsZmJmbXlyaWpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1MzQ3MzYsImV4cCI6MjA1NTExMDczNn0.4yEJaQJlmA5mNfuId6jVRjlCI8bhyrdTJLo4vd0Fpfo`, // Include your access token if needed
          'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey[0] as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
