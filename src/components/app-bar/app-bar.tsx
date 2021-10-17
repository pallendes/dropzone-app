import React, {useContext} from 'react';
import {
  IconButton,
  Toolbar,
  Typography,
  useTheme,
  AppBar as MuiAppBar,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {ColorModeContext} from 'context/color-mode';

const AppBar: React.FC = () => {
  const theme = useTheme();
  const {dispatch} = useContext(ColorModeContext);

  return (
    <MuiAppBar position="static">
      <Toolbar
        sx={{justifyContent: ['center', 'center', 'center', 'flex-start']}}
      >
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          component="div"
          sx={{flexGrow: 1}}
        >
          Dropzone APP
        </Typography>
        <Typography>Toggle mode</Typography>
        <IconButton
          sx={{ml: 1}}
          onClick={() => dispatch({type: 'toggle_mode'})}
          color="inherit"
        >
          {theme.palette.mode === 'dark' ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
