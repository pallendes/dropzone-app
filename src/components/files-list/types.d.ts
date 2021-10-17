export interface FilesListProps {
  files: Array<File>;
  onFileRemoved: (file: File) => void;
  isUplaoding: boolean;
}
