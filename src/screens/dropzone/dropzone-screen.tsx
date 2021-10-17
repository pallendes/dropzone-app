import React, {useCallback, useState} from 'react';
import {
  Alert,
  AlertColor,
  Container,
  CssBaseline,
  Grid,
  Snackbar,
} from '@mui/material';
import {useDropzone} from 'react-dropzone';
import Dropzone from 'components/dropzone';
import AppBar from 'components/app-bar';
import FilesList from 'components/files-list';
import DropzoneLoading from 'components/dropzone-loading/dropzone-loading';
import DropzoneUploadButton from 'components/dropzone-upload-button/dropzone-upload-button';
import * as fileService from 'services/files';

const App: React.FC = () => {
  const [files, setFiles] = useState<Array<File>>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [notification, setNotification] = useState<{
    open: boolean;
    severity: AlertColor;
  }>({open: false, severity: 'success'});

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles]);
    },
    [files]
  );
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  const uploadFiles = async () => {
    setIsUploading(true);

    try {
      await Promise.all(
        files.map(async (file) => {
          await fileService.upload(file);

          onFileRemoved(file);
        })
      );
      setNotification({open: true, severity: 'success'});
    } catch (e) {
      setNotification({open: true, severity: 'error'});
    }

    setIsUploading(false);
  };

  const onFileRemoved = (removedFile: File) => {
    const index = files.findIndex((file) => file.name === removedFile.name);

    files.splice(index, 1);
    setFiles([...files]);
  };

  const handleNotificationClose = () => {
    setNotification({open: false, severity: 'success'});
  };

  return (
    <>
      <CssBaseline />
      <AppBar />
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleNotificationClose}
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
      >
        <Alert
          onClose={handleNotificationClose}
          severity={notification.severity}
          sx={{width: '100%'}}
        >
          {notification.severity === 'success'
            ? 'Files uploaded'
            : 'An error has ocurred, please try again'}
        </Alert>
      </Snackbar>
      <Container component="main" sx={{mb: 4}}>
        <Grid container spacing={3} component="section">
          <Grid item xs={12}>
            {isUploading ? (
              <DropzoneLoading />
            ) : (
              <Dropzone
                rootProps={getRootProps()}
                inputProps={getInputProps()}
                isDragActive={isDragActive}
              />
            )}
          </Grid>
        </Grid>
        <FilesList
          files={files}
          onFileRemoved={onFileRemoved}
          isUplaoding={isUploading}
        />
        <DropzoneUploadButton
          onUploadFilesClick={uploadFiles}
          disabled={isUploading || files.length === 0}
        />
      </Container>
    </>
  );
};

export default App;
