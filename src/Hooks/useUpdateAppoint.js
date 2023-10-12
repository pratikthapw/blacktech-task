import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAppointment } from "../services/getApi";

export default function useUpdateAppoint() {
  const queryClient = useQueryClient();
  const { mutate: updateAppoint, isLoading: isUpdating } = useMutation({
    mutationFn: updateAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appoints"] });
    },
  });
  return { updateAppoint, isUpdating };
}
