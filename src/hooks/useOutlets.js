"use client";
import { useQuery } from "@tanstack/react-query";
import { outlets } from "@/utils/urls";

export default function useOutlets(countryId) {
  return useQuery({
    queryKey: ["outlets", countryId],
    queryFn: async () => {
      const response = await fetch(`${outlets}?country=${countryId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch outlets");
      }
      const data = await response.json();
      return data.results.data;
    },
    enabled: !!countryId,
  });
}
