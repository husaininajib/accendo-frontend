import TextField from '@mui/material/TextField';

const SearchFilter = (props: { searchValue: string; handleChange: (x: string) => void }) => {
    const { searchValue, handleChange } = props;

    return (
        // <Box>
        <TextField
            id="outlined-basic"
            label="Search for a country"
            variant="outlined"
            value={searchValue}
            onChange={(e) => handleChange(e.target.value)}
            size="small"
            fullWidth
            sx={{ backgroundColor: 'white' }}
        />
        // </Box>
    );
};

export default SearchFilter;
