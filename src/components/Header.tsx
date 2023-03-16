import { AppBar, Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from './RootLayout';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { backgroundColor, fontColor } from '../helper/utils';
import { useParams } from 'react-router-dom';

interface Props {
    view: 'table' | 'card';
}

const Header = ({ view }: Props) => {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    const { dynamicCountry } = useParams();

    const themeIconToDisplay = (mode: 'dark' | 'light') => {
        if (mode === 'dark') return <LightModeIcon />;

        return <DarkModeIcon />;
    };

    const headerTitle = (param: string | undefined, view: 'table' | 'card') => {
        if (param) {
            return 'Country Details';
        }
        return view === 'table' ? 'Country Table View' : 'Country Card View';
    };

    return (
        <Box
            sx={{
                flexGrow: 1,
                borderBottom: colorMode.mode === 'dark' ? '1px solid #fff' : '1px solid rgba(0, 0, 0, 0.26)',
            }}
        >
            <AppBar
                position="static"
                sx={{
                    px: { xs: '30px', sm: '50px', md: '150px' },
                    py: '20px',
                    backgroundColor: backgroundColor(colorMode.mode),
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography
                        sx={{
                            display: { xs: 'none', sm: 'inherit' },
                            color: fontColor(colorMode.mode),
                        }}
                        variant="h5"
                    >
                        {headerTitle(dynamicCountry, view)}
                    </Typography>

                    <Button
                        onClick={colorMode.toggleColorMode}
                        variant="outlined"
                        sx={{
                            background: 'transparent',
                            padding: '0px',
                            border: 'none',
                            '&:hover': {
                                background: 'none',
                                border: 'none',
                            },
                            marginLeft: { xs: 'auto', sm: '0px' },
                            color: fontColor(colorMode.mode),
                        }}
                        startIcon={themeIconToDisplay(colorMode.mode)}
                        disableRipple
                    >
                        {theme.palette.mode === 'light' ? 'Dark Mode' : 'Light Mode'}
                    </Button>
                </div>
            </AppBar>
        </Box>
    );
};

export default Header;
