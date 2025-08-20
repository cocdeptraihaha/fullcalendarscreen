import React, { useEffect, useState } from 'react';
import { InputContainer } from './styled';
import { FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import { fetchStaff } from '../../../services/api';

// Define Staff's datatype
interface Staff {
  id: number;
  name: string;
}

const StaffSection: React.FC = () => {
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [staff, setStaff] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStaff = async () => {
      try {
        setLoading(true);
        const data: Staff[] = await fetchStaff();
        setStaffList(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unknown error');
        }
      } finally {
        setLoading(false);
      }
    };

    loadStaff();
  }, []);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStaff(event.target.value as string);
  };

  return (
    <InputContainer>
      <FormControl fullWidth>
        <InputLabel id="staff-label">Staff</InputLabel>
        {loading ? (
          <CircularProgress size={24} />
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <Select
            labelId="staff-label"
            value={staff}
            onChange={handleChange} //ts warning fix later
            label="Staff"
          >
            {staffList.map((s) => (
              <MenuItem key={s.id} value={s.name}>
                {s.name}
              </MenuItem>
            ))}
          </Select>
        )}
      </FormControl>
    </InputContainer>
  );
};

export default StaffSection;
