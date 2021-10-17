import React from 'react';
import {
  Paper,
  Box,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {DropzoneProps} from './types';

const Dropzone: React.FC<DropzoneProps> = ({
  rootProps,
  inputProps,
  isDragActive,
}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <>
      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          padding: 2,
          mt: 4,
          mb: 4,
        }}
      >
        <Box
          {...rootProps}
          data-testid="dropzone-component"
          sx={{
            height: [200, 200, 400],
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'background',
            borderRadius: 1,
            borderStyle: 'dashed',
            borderColor: isDragActive ? 'secondary.dark' : 'grey.400',
          }}
        >
          <input {...inputProps} data-testid="dropzone-input" />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <Grid
              container
              spacing={1}
              alignItems="center"
              justifyContent="center"
              direction="column"
            >
              <Grid item xs={4}>
                <CloudUploadIcon
                  sx={{fontSize: 48, color: 'primary'}}
                  color="primary"
                />
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h6" component="span">
                  Upload your files
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <Typography component="p" textAlign="center">
                  {matches
                    ? "Drag 'n' drop your files here or click to select"
                    : 'Press to select the file'}
                </Typography>
              </Grid>
            </Grid>
          )}
        </Box>
      </Paper>
    </>
  );
};

export default Dropzone;
