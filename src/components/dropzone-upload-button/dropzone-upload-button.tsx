import React from 'react';
import {Button, Grid} from '@mui/material';
import {DropzoneUploadButtonProps} from './types';

const DropzoneUploadButton: React.FC<DropzoneUploadButtonProps> = ({
  onUploadFilesClick,
  disabled,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={{textAlign: 'right'}}>
        <Button
          variant="contained"
          sx={{width: ['100%', '100%', 'auto'], mt: 2}}
          onClick={onUploadFilesClick}
          disabled={disabled}
        >
          Upload files
        </Button>
      </Grid>
    </Grid>
  );
};

export default DropzoneUploadButton;
