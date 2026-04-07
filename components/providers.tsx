"use client";

import { useRef } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

export function ConvexClientProvider({ children }: { children: React.ReactNode }) {
  const client = useRef<ConvexReactClient>(null);
  if (!client.current) {
    client.current = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  }
  return <ConvexProvider client={client.current}>{children}</ConvexProvider>;
}
