import React, { useState } from "react";
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
    formState: { errors },
  } = useFormContext();
  const [staffSearchTerm, setStaffSearchTerm] = useState("");
  const debouncedStaffSearchTerm = useDebounce(staffSearchTerm, 500);

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
          const displayStaff = debouncedStaffSearchTerm
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
