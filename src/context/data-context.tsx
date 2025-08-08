import { createContext, useContext, useState, ReactNode } from "react";
import { ActorExtras } from "@/components/ui/forms/actor-form";
import { ProducerExtras } from "@/components/ui/forms/producer-form";

export type ChildPayload = ActorExtras | ProducerExtras; // | BShape | CShape;

interface DataContextType {
  upliftData: (payload: ChildPayload) => void;
  latestPayload: ChildPayload | null;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [latestPayload, setLatestPayload] = useState<ChildPayload | null>(null);

  const upliftData = (payload: ChildPayload) => {
    setLatestPayload(payload);
  };

  return (
    <DataContext.Provider value={{ upliftData, latestPayload }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = (): DataContextType => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useDataContext must be used inside DataProvider");
  return ctx;
};
