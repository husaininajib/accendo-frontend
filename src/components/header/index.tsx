import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
// import { useSearchParams } from 'react-router-dom';

const Header = () => {
    const [searchparams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const viewStatus = searchparams.get('view');
    const darkMode = searchparams.get('darkMode');
    const searchParams = new URLSearchParams(location.search);
    const isDarkMode = darkMode === 'true' ? true : false;

    // console.log(location);
    // console.log(typeof darkMode, darkMode);
    // console.log(typeof viewStatus, viewStatus);

    const titleDisplay = (viewCategory: string | null) => {
        if (viewCategory === 'card') {
            return 'Countries Card View';
        } else if (viewCategory === 'table') {
            return 'Countries Table View';
        }
        return 'Countries Card View';
    };

    const darkModeIcon = (status: boolean) => {
        if (status) return <LightModeIcon />;

        return <DarkModeIcon />;
    };

    const toggleDarkMode = () => {
        const currentDarkMode = searchParams.get('darkMode');
        const newDarkMode = currentDarkMode === 'true' ? 'false' : 'true';
        searchParams.set('darkMode', newDarkMode);
        navigate({ search: searchParams.toString() });
    };

    // const darkModeTitle = (darkModeStatus:) => {};

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: isDarkMode ? 'black' : 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h1 style={{ color: isDarkMode ? 'white' : 'black' }}>{titleDisplay(viewStatus)}</h1>

                    <Button
                        onClick={toggleDarkMode}
                        variant="outlined"
                        sx={{
                            background: 'transparent',
                            color: isDarkMode ? 'white' : 'black',
                            border: 'none',
                            '&:hover': {
                                background: 'none',
                                border: 'none',
                            },
                        }}
                        startIcon={darkModeIcon(isDarkMode)}
                    >
                        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    </Button>
                </div>
            </AppBar>
        </Box>
    );
};

export default Header;
