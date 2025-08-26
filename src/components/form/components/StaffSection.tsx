import React from "react";
import { InputContainer, InputLabel } from "./styled";
import { ErrorMessage } from "../Form.styled";
import Dropdown from "../../ui/dropdown";
import { Controller, useFormContext } from "react-hook-form";
import { StyledDropdownAvatar } from "../../ui/dropdown/styled";
import { useStaff } from "../../../hooks/useFormData";

// Define Staff's datatype
interface Staff {
  id: string;
  name: string;
  avatar: string;
}

const StaffSection: React.FC = () => {
  const { control, formState: { errors } } = useFormContext();
  const { data: staffList = [] } = useStaff();

  return (
    <InputContainer>
      {(!errors.staff && <InputLabel>Staff</InputLabel>) ||
        (errors.staff && (
          <ErrorMessage>{(errors.staff as any)?.message}</ErrorMessage>
        ))}
      <Controller
        control={control}
        name="staff"
        render={({ field }) => (
          <Dropdown
            hasSearch={2}
            Items={staffList}
            value={field.value}
            onChange={(val: any) => {
              // Find selected staff by ID and store name in form
              const selectedStaff = staffList.find((s) => s.id === val);
              field.onChange(selectedStaff?.name); // Store name, not ID
            }}
            renderTitle={() => (
              <>
                {field.value ? (
                  <>
                    <StyledDropdownAvatar
                      src={
                        staffList.find((s) => s.name === field.value)?.avatar // Find avatar by name
                      }
                      alt="avatar"
                    />
                    {field.value}
                  </>
                ) : (
                  "Search Staff"
                )}
              </>
            )}
          />
        )}
      />
    </InputContainer>
  );
};

export default StaffSection;
