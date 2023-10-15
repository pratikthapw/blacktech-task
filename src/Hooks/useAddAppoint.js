import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAppointment } from "../services/getApi";
import toast from "react-hot-toast";

export default function useAddAppoint() {
  const queryClient = useQueryClient();
  const { mutate: addAppoint, isLoading: isAdding } = useMutation({
    mutationFn: addAppointment,
    onSuccess: () => {
      toast.success("Successfully Added");
      queryClient.invalidateQueries({ queryKey: ["appoints"] });
    },
  });
  return { addAppoint, isAdding };
}
