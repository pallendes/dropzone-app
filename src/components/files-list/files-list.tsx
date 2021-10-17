import React from 'react';
import {
  Box,
  CircularProgress,
  Collapse,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import {TransitionGroup} from 'react-transition-group';
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteIcon from '@mui/icons-material/Delete';
import {DropzoneFile} from 'screens/dropzone/types';
import {getSizeText} from './utils';

interface FilesListProps {
  files: Array<DropzoneFile>;
  onFileRemoved: (file: File) => void;
  isUplaoding: boolean;
}

const FilesList: React.FC<FilesListProps> = ({
  files,
  onFileRemoved,
  isUplaoding,
}) => {
  return (
    <Grid container spacing={2} component={TransitionGroup}>
      {files.map(({file}) => (
        <Grid xs={12} md={6} lg={4} item component={Collapse} key={file.name}>
          <Paper
            elevation={0}
            variant="outlined"
            sx={{
              padding: 2,
            }}
          >
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
              <Box sx={{display: 'flex'}}>
                <DescriptionIcon
                  sx={{fontSize: 24, color: 'primary', mr: 1}}
                  color="primary"
                />
                <Typography sx={{mr: 1}}>{file.name}</Typography>
                <Typography>{getSizeText(file.size)}</Typography>
              </Box>
              {isUplaoding ? (
                <CircularProgress color="inherit" size={24} />
              ) : (
                <DeleteIcon
                  role="button"
                  aria-label={`Remove file ${file.name}`}
                  sx={{fontSize: 24, color: 'error.light', cursor: 'pointer'}}
                  onClick={() => onFileRemoved(file)}
                />
              )}
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default FilesList;
