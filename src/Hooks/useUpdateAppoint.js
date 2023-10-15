import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAppointment } from "../services/getApi";
import toast from "react-hot-toast";

export default function useUpdateAppoint() {
  const queryClient = useQueryClient();
  const { mutate: updateAppoint, isLoading: isUpdating } = useMutation({
    mutationFn: updateAppointment,
    onSuccess: () => {
      toast.success("Appointment Updated");
      queryClient.invalidateQueries({ queryKey: ["appoints"] });
    },
  });
  return { updateAppoint, isUpdating };
}
