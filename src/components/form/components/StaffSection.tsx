import React, { useEffect, useState } from "react";
import { InputContainer, InputLabel } from "./styled";
import { fetchStaff } from "../../../services/api";
import Dropdown from "../../ui/dropdown";
import { Controller, useFormContext } from "react-hook-form";
import { StyledDropdownAvatar } from "../../ui/dropdown/styled";

// Define Staff's datatype
interface Staff {
  id: number;
  name: string;
  avatar: string;
}

const StaffSection: React.FC = () => {
  const { control } = useFormContext();
  const [staffList, setStaffList] = useState<Staff[]>([]);

  // Load staff data from API when component mounts
  useEffect(() => {
    const loadStaff = async () => {
      try {
        const data: Staff[] = await fetchStaff();
        setStaffList(data);
      } catch (err: unknown) {
        // Type-safe error handling for unknown error types
        if (err instanceof Error) {
          console.log(err.message);
        } else {
          console.log("Unknown error");
        }
      }
    };

    loadStaff();
  }, []);

  return (
    <InputContainer>
      <InputLabel>Staff</InputLabel>
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
