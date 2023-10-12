import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "../services/getApi";

export default function useAppointRows() {
  const { data: appoints, isLoading } = useQuery({
    queryKey: ["appoints"],
    queryFn: getAppointments,
  });
  return { appoints, isLoading };
}
