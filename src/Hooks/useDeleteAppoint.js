import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAppointment } from "../services/getApi";

export default function useDeleteAppoint() {
  const queryClient = useQueryClient();
  const { mutate: deleteAppoint, isLoading: isDeleting } = useMutation({
    mutationFn: deleteAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appoints"] });
    },
  });
  return { deleteAppoint, isDeleting };
}
