import { useQuery } from "@tanstack/react-query";
import { getProperties } from "../services/api/properties.js";

export default function useProperties(filters = {}) {
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery(["properties", filters], () => getProperties(filters).then(res => res.data));

  return {
    properties: data?.data || [],
    total: data?.total || 0,
    isLoading,
    isError,
    refetch,
  };
}
