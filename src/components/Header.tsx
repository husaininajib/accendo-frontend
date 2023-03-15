import { AppBar, Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from './RootLayout';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

interface Props {
    view: 'table' | 'card';
}

const Header = ({ view }: Props) => {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);

    const darkModeIcon = (mode: 'dark' | 'light') => {
        if (mode === 'light') return <LightModeIcon />;

        return <DarkModeIcon />;
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                sx={{
                    px: { xs: '30px', sm: '50px', md: '150px' },
                    py: '20px',
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography
                        sx={{
                            display: { xs: 'none', sm: 'inherit' },
                        }}
                        variant="h5"
                    >
                        {view === 'table' ? 'Country Table View' : 'Country Card view'}
                    </Typography>

                    <Button
                        // onClick={colorMode.toggleColorMode}
                        onClick={colorMode.toggleColorMode}
                        variant="outlined"
                        sx={{
                            background: 'transparent',
                            padding: '0px',
                            // color: isDarkMode ? 'white' : 'black',
                            border: 'none',
                            '&:hover': {
                                background: 'none',
                                border: 'none',
                            },
                            marginLeft: { xs: 'auto', sm: '0px' },
                        }}
                        startIcon={darkModeIcon(colorMode.mode)}
                        disableRipple
                    >
                        {theme.palette.mode === 'light' ? 'Light Mode' : 'Dark Mode'}
                    </Button>
                </div>
            </AppBar>
        </Box>
    );
};

export default Header;
