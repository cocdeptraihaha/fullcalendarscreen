import React, { useState, useEffect, useRef } from "react";
import { InputContainer, InputLabel } from "./styled";
import { ErrorMessage } from "../Form.styled";
import Dropdown from "../../ui/dropdown";
import { Controller, useFormContext } from "react-hook-form";
import { StyledDropdownAvatar } from "../../ui/dropdown/styled";
import { useGlobalStaff, useSearchStaff } from "../../../hooks/useGlobalData";
import { useDebounce } from "../../../hooks/useDebounce";

// Define Staff's datatype

const StaffSection: React.FC = () => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const [staffSearchTerm, setStaffSearchTerm] = useState("");
  const debouncedStaffSearchTerm = useDebounce(staffSearchTerm, 500);
  const previousStaffId = useRef<string>("");
  const previousAptId = useRef<string | null>(null);
  
  const currentStaffId = watch("staff_id");
  const currentAptId = watch("id");
  
  // Reset service logic based on appointment and staff changes
  useEffect(() => {
    const prevApt = previousAptId.current;
    const prevStaff = previousStaffId.current;
    
    if (prevApt === currentAptId && prevStaff !== currentStaffId) {
      // Same appointment but different staff -> reset services
      setValue("service_ids", []);
    } else if (prevApt === null) {
      // Opening new form -> reset services
      setValue("service_ids", []);
    }
    // prevApt !== currentAptId && prevStaff !== currentStaff -> load new service data (do nothing)
    
    previousStaffId.current = currentStaffId;
    previousAptId.current = currentAptId;
  }, [currentStaffId, currentAptId, setValue]);

  const { data: staffList = [] } = useGlobalStaff();
  const { data: searchResults = [] } = useSearchStaff(debouncedStaffSearchTerm);

  return (
    <InputContainer>
      {(!errors.staff_id && <InputLabel>Staff</InputLabel>) ||
        (errors.staff_id && (
          <ErrorMessage>{(errors.staff_id as any)?.message}</ErrorMessage>
        ))}
      <Controller
        control={control}
        name="staff_id"
        render={({ field }) => {
          const displayStaff = staffSearchTerm
            ? searchResults.slice(0, 5)
            : staffList.slice(0, 5);
          const selectedStaff = staffList.find((s) => s.id === field.value);

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
    </InputContainer>
  );
};

export default StaffSection;
