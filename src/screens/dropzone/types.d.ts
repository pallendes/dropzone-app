export interface State {
  files: Array<File>;
}

export type Action =
  | {type: 'add_file'; payload: Array<File>}
  | {type: 'remove_file'; payload: File};

export type Dispatch = (action: Action) => void;

export type DropzonScreenProviderProps = {children: React.ReactNode};

export type DropzoneScreenContextProps = {
  state: State;
  dispatch: Dispatch;
};

export interface DropzoneFile {
  file: File;
  status: 'none' | 'rejected';
}
