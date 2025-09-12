import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { InputContainer, InputLabel } from "./styled";
import { ErrorMessage } from "../Form.styled";
import Dropdown from "../../ui/dropdown";
import { Controller, useFormContext } from "react-hook-form";
import { StyledDropdownAvatar } from "../../ui/dropdown/styled";
import { useDebounce } from "../../../hooks/useDebounce";
import { useStaff } from "../../../hooks/useData";
import { useSearchStaff } from "../../../hooks/useFunction";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

// Define Staff's datatype

interface StaffSectionProps {
  isInModal?: boolean;
}

const StaffSection: React.FC<StaffSectionProps> = ({ isInModal = false }) => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const [staffSearchTerm, setStaffSearchTerm] = useState("");
  const debouncedStaffSearchTerm = useDebounce(staffSearchTerm, 200);
  const previousStaffId = useRef<string>("");
  const previousAptId = useRef<string | null>(null);
  const previousServices = useRef<{ [staffId: string]: string[] }>({});

  const currentStaffId = watch("staff_id");
  const currentAptId = watch("id");
  const currentServices = watch("service_ids") || [];

  // Reset service logic based on appointment and staff changes
  useEffect(() => {
    if (isInModal) return; // Skip reset logic when in modal

    const prevApt = previousAptId.current;
    const prevStaff = previousStaffId.current;

    // Save current services before any changes
    if (prevStaff && currentServices.length > 0) {
      previousServices.current[prevStaff] = currentServices;
    }

    if (prevApt === currentAptId && prevStaff !== currentStaffId) {
      // Same appointment but different staff
      if (currentStaffId && previousServices.current[currentStaffId]) {
        // Restore previous services for this staff
        setValue("service_ids", previousServices.current[currentStaffId]);
      } else {
        // Reset services for new staff
        setValue("service_ids", []);
      }
    } else if (prevApt === null) {
      // Opening new form -> reset services
      setValue("service_ids", []);
    }
    // prevApt !== currentAptId && prevStaff !== currentStaff -> load new service data (do nothing)

    previousStaffId.current = currentStaffId;
    previousAptId.current = currentAptId;
  }, [currentStaffId, currentAptId, setValue, currentServices, isInModal]);

  const { data: staffList = [] } = useStaff();
  const { data: searchResults = [] } = useSearchStaff(debouncedStaffSearchTerm);
  const { eventData } = useSelector((state: RootState) => state.form);

  const normalize = useCallback(
    (list: any[]) =>
      (list || []).map((s: any) => ({
        ...s,
        name: s.name ?? [s.first_name, s.last_name].filter(Boolean).join(" "),
      })),
    []
  );

  const normalizedStaff = useMemo(
    () => normalize(staffList),
    [staffList, normalize]
  );
  const normalizedSearch = useMemo(
    () => normalize(searchResults),
    [searchResults, normalize]
  );

  return (
    <InputContainer>
      <InputLabel>Staff</InputLabel>
      <Controller
        control={control}
        name="staff_id"
        render={({ field }) => {
          let baseList = staffSearchTerm ? normalizedSearch : normalizedStaff;
          const selectedFromLists = [
            ...normalizedStaff,
            ...normalizedSearch,
          ].find((s) => s.id === field.value);
          const selectedFromEvent = eventData?.staff
            ? {
                ...eventData.staff,
                name:
                  eventData.staff.name ??
                  [eventData.staff.first_name, eventData.staff.last_name]
                    .filter(Boolean)
                    .join(" "),
              }
            : undefined;
          const selectedStaff =
            selectedFromLists ||
            (selectedFromEvent && selectedFromEvent.id === field.value
              ? selectedFromEvent
              : undefined);
          const displayStaff = (
            selectedStaff && !baseList.some((s) => s.id === selectedStaff.id)
              ? [selectedStaff, ...baseList]
              : baseList
          ).slice(0, 5);

          return (
            <Dropdown
              hasSearch={2}
              Items={displayStaff}
              value={field.value}
              onChange={(val: any) => field.onChange(val)} // Store ID directly
              onSearch={setStaffSearchTerm}
              renderTitle={() => (
                <>
                  {selectedStaff ? (
                    <>
                      <StyledDropdownAvatar
                        src={selectedStaff.avatar}
                        alt="avatar"
                      />
                      {selectedStaff.name}
                    </>
                  ) : (
                    "Search Staff"
                  )}
                </>
              )}
            />
          );
        }}
      />
      {errors.staff_id && (
        <ErrorMessage>{(errors.staff_id as any)?.message}</ErrorMessage>
      )}
    </InputContainer>
  );
};

export default StaffSection;
