import TextField from '@mui/material/TextField';
import React from 'react';

const SearchFilter = (props: { searchValue: string; handleChange: (x: string) => void }) => {
    const { searchValue, handleChange } = props;

    return (
        <TextField
            id="outlined-basic"
            label="Search for a country"
            variant="outlined"
            value={searchValue}
            onChange={(e) => handleChange(e.target.value)}
            size="small"
            fullWidth
        />
    );
};

export default SearchFilter;
