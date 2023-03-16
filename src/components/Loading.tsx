import React from 'react';
import Box from '@mui/material/Box';
import { ColorModeContext } from './RootLayout';
import { fontColor } from '../helper/utils';

interface Props {
    marginTop?: number;
}

const Loading = ({ marginTop }: Props) => {
    const colorMode = React.useContext(ColorModeContext);
    return (
        <Box
            sx={{
                px: { xs: '5px', sm: '50px', md: '150px' },
                fontSize: '40px',
                textAlign: 'center',
                marginTop: marginTop ? `${marginTop}px` : '0px',
                color: fontColor(colorMode.mode),
            }}
        >
            Loading...
        </Box>
    );
};

export default Loading;
