import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAppointmentType, updateAppointmentType, deleteAppointmentType } from "../services/api";
import { toast } from "react-toastify";

export const useCreateAppointmentType = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createAppointmentType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointmentTypes"] });
      toast.success("Appointment type created successfully!");
    },
    onError: (error: any) => {
      toast.error("Failed to create appointment type");
      console.error("Create appointment type error:", error);
    },
  });
};

export const useUpdateAppointmentType = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { label: string; color: string } }) =>
      updateAppointmentType(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointmentTypes"] });
    },
    onError: (error: any) => {
      toast.error("Failed to update appointment type");
      console.error("Update appointment type error:", error);
    },
  });
};

export const useDeleteAppointmentType = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteAppointmentType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointmentTypes"] });
      toast.success("Appointment type deleted successfully!");
    },
    onError: (error: any) => {
      toast.error("Failed to delete appointment type");
      console.error("Delete appointment type error:", error);
    },
  });
};