"use client";
import { DataProvider } from "@/context/DataContext";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <DataProvider>{children}</DataProvider>;
};
