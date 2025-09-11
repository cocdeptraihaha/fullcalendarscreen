import { useMutation } from "@tanstack/react-query";
import { updateStaffVisible } from "../services/api";
import { toast } from "react-toastify";

export const useUpdateStaffVisible = () => {

  return useMutation({
    mutationFn: ({ id, visible }: { id: string; visible: 0 | 1 }) =>
      updateStaffVisible(id, visible),
    onError: (error: any) => {
      console.error("Error updating staff visibility:", error);
      toast.error("Failed to update staff visibility");
    },
  });
};
