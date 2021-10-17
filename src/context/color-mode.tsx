import React, {ReactElement, useMemo} from 'react';
import {ThemeProvider, createTheme} from '@mui/material/styles';

export const ColorModeContext = React.createContext<{
  mode: ColorMode;
  dispatch: (action: Action) => void | null;
}>({mode: 'light', dispatch: () => null});

interface ColorModeProviderProps {
  children: ReactElement;
}

type ColorMode = 'light' | 'dark';

type Action = {type: 'toggle_mode'};

const colorModeReducer = (colorMode: ColorMode, action: Action): ColorMode => {
  if (action.type === 'toggle_mode') {
    return colorMode === 'light' ? 'dark' : 'light';
  }

  throw new Error(`Unhandled action type: ${action}`);
};

export const ColorModeProvider: React.FC<ColorModeProviderProps> = ({
  children,
}): ReactElement => {
  const [mode, dispatch] = React.useReducer(colorModeReducer, 'light');

  const value = useMemo(() => ({mode, dispatch}), [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};
