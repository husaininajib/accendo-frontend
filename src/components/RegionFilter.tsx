import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { REGIONS } from '../constants';

const RegionFilter = (props: { dropdownValue: string; handleChange: (x: string) => void }) => {
    const { dropdownValue, handleChange } = props;
    // console.log(dropdownValue, 'j');s
    return (
        <FormControl size="small" sx={{ minWidth: '180px' }}>
            <InputLabel id="demo-simple-select-label">Filter By Region</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={dropdownValue}
                label="Filter By Region"
                onChange={(e) => handleChange(e.target.value)}
                size="small"
            >
                {REGIONS.map((region) => (
                    <MenuItem key={region.value} value={region.value}>
                        {region.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default RegionFilter;
