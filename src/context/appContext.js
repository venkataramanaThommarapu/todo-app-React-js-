import { useState, createContext, useContext } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const AppContext = createContext();
export const GetAppContext = () => useContext(AppContext);

const AppContextProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const useTheme = createTheme({
        palette: {
            mode: theme,
        },
    });


    

    const value = {
        theme,
        toggleTheme,
    };

    return (
        <AppContext.Provider value={value}>
            <ThemeProvider theme={useTheme}>
                {children}
            </ThemeProvider>
        </AppContext.Provider>
    )
}

export default AppContextProvider;