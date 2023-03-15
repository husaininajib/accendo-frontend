import React from 'react';
import Header from './Header';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';

interface Props {
    view: 'table' | 'card';
    children: React.ReactNode;
}

interface FilterData {
    search: string;
    selectedRegion: string;
}

const RootLayout = ({ view, children }: Props) => {
    const [mode, setMode] = React.useState<'light' | 'dark'>('light');

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
            mode,
        }),
        [mode]
    );

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    // primary: {
                    //     main: '#fff',
                    //     contrastText: '#5cbc63',
                    // },
                    // secondary: {
                    //     main: '#5cbc63',
                    //     contrastText: '#5cbc63',
                    // },
                },
            }),
        [mode]
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <div>{children}</div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default RootLayout;

export const ColorModeContext = React.createContext<{
    toggleColorMode: () => void;
    mode: 'dark' | 'light';
}>({ toggleColorMode: () => {}, mode: 'light' });
