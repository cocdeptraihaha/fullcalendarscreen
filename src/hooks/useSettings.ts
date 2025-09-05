import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSettings } from "../services/api";
import { toast } from "react-toastify";

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (error: any) => {
      console.error("Error updating settings:", error);
      toast.error("Failed to save settings");
    },
  });
};
