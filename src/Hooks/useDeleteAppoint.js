import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAppointment } from "../services/getApi";
import toast from "react-hot-toast";

export default function useDeleteAppoint() {
  const queryClient = useQueryClient();
  const { mutate: deleteAppoint, isLoading: isDeleting } = useMutation({
    mutationFn: deleteAppointment,
    onSuccess: () => {
      toast.error("Appointment Deleted");
      queryClient.invalidateQueries({ queryKey: ["appoints"] });
    },
  });
  return { deleteAppoint, isDeleting };
}
