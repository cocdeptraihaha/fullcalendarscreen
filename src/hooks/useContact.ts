import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createContact } from "../services/api";

export const useCreateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createContact,
    onSuccess: () => {
      // Invalidate and refetch contacts queries
      queryClient.invalidateQueries({ queryKey: ["paginatedContacts"] });
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      queryClient.invalidateQueries({ queryKey: ["searchContacts"] });
    },
    onError: (error) => {
      console.error("Error creating contact:", error);
    },
  });
};
