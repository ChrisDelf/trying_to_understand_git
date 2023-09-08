// ThemeProvider.js
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const themeVariables = {
    light: {
      backgroundColor: '#FEFEFE',
      textColor: '#010101',
    },
    dark: {
      backgroundColor: '#010101',
      textColor: '#FEFEFE',
    },
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeVariables }}>
      {children}
    </ThemeContext.Provider>
  );
};

