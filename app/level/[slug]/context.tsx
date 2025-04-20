"use client";

import { createContext, useContext } from "react";
import { Vocabulary } from "../../../lib/utils";

export const VocaContext = createContext<Promise<Vocabulary[]> | null>(null);

export function VocaProvider({
  children,
  vocaPromise,
}: {
  children: React.ReactNode;
  vocaPromise: Promise<Vocabulary[]>;
}) {
  return (
    <VocaContext.Provider value={vocaPromise}>{children}</VocaContext.Provider>
  );
}

export function useVocaContext() {
  const context = useContext(VocaContext);
  if (!context) {
    throw new Error("useVocaContext must be used within a VocaProvider");
  }
  return context;
}
