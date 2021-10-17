import {DropzoneInputProps, DropzoneRootProps} from 'react-dropzone';

export interface DropzoneProps {
  rootProps: DropzoneRootProps;
  inputProps: DropzoneInputProps;
  isDragActive: boolean;
}
