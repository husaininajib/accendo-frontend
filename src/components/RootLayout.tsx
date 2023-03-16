import React from 'react';
import Header from './Header';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';

interface Props {
    children: React.ReactNode;
}

const RootLayout = ({ children }: Props) => {
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
                <div
                    style={{
                        minHeight: '100vh',
                        backgroundColor: colorMode.mode === 'dark' ? '#000000' : 'rgba(0, 0, 0, 0.08)',
                    }}
                >
                    {children}
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default RootLayout;

export const ColorModeContext = React.createContext<{
    toggleColorMode: () => void;
    mode: 'dark' | 'light';
}>({ toggleColorMode: () => {}, mode: 'light' });
