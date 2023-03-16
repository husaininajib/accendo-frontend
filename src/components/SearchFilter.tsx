import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';

const SearchFilter = (props: { searchValue: string; handleChange: (x: string) => void }) => {
    const { searchValue, handleChange } = props;

    return (
        <TextField
            id="outlined-basic"
            // label="Search for a country"
            placeholder="Search for a country"
            variant="outlined"
            value={searchValue}
            onChange={(e) => handleChange(e.target.value)}
            size="small"
            fullWidth
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default SearchFilter;
