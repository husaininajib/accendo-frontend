import React from 'react';
import CountryDetails from '../components/CountryDetails';
import { Box } from '@mui/material';

const CountryDetailsPage = () => {
    return (
        <Box
            sx={{
                px: {
                    xs: '30px',
                    sm: '50px',
                    md: '150px',
                },
            }}
        >
            <CountryDetails />
        </Box>
    );
};

export default CountryDetailsPage;
