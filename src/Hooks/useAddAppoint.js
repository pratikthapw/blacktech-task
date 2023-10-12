import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAppointment } from "../services/getApi";

export default function useAddAppoint() {
  const queryClient = useQueryClient();
  const { mutate: addAppoint, isLoading: isAdding } = useMutation({
    mutationFn: addAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appoints"] });
    },
  });
  return { addAppoint, isAdding };
}
