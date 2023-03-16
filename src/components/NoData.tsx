import { Box } from '@mui/material';
import React from 'react';
import { fontColor } from '../helper/utils';
import { ColorModeContext } from './RootLayout';

const NoData = () => {
    const colorMode = React.useContext(ColorModeContext);
    return (
        <Box
            sx={{ px: { xs: '30px', sm: '50px', md: '150px' }, textAlign: 'center', color: fontColor(colorMode.mode) }}
        >
            <h1>No Data</h1>
        </Box>
    );
};

export default NoData;
