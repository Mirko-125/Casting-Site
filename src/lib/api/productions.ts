import { address, submitProduction, getPairs } from "@/misc/routes";

export interface Production {
    productionName: string;
    productionCode: string;
    budget: string;
    address: string;
    about: string;
}

export const createProduction = async (dto: Production): Promise<string> => {
  const res = await fetch(address + submitProduction, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dto),
    credentials: "include",
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to create production");
  }
  const data = await res.json();
  return data.id;
};

export const getProductionPairs = async (): Promise<Record<string, string>> => {
  const response = await fetch(address + getPairs, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch production pairs");
  }
  const data: Record<string, string> = await response.json();

  return data;
};