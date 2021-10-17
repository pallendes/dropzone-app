import {CircularProgress, Grid, Paper, Typography, Box} from '@mui/material';
import React from 'react';

const DropzoneLoading: React.FC = () => {
  return (
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
        sx={{
          height: [200, 200, 400],
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Grid
          container
          spacing={1}
          alignItems="center"
          justifyContent="center"
          direction="column"
        >
          <Grid item xs={4}>
            <CircularProgress color="secondary" size={48} />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" component="span">
              Uploading files...
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default DropzoneLoading;
