"use client";
import { DataProvider } from "@/context/data-context";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <DataProvider>{children}</DataProvider>;
};
