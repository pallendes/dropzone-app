/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {render, waitFor, fireEvent, screen} from '@testing-library/react';
import * as filesService from 'services/files';
import DropzoneScreen from '.';

describe('<DropzoneScreen />', () => {
  const upload = jest.spyOn(filesService, 'upload');
  const file = new File([JSON.stringify({ping: true})], 'a-file.json', {
    type: 'application/json',
  });

  beforeEach(() => {
    upload.mockResolvedValue();
  });

  afterEach(() => {
    upload.mockClear();
  });

  it('should display the files loaded', async () => {
    render(<DropzoneScreen />);
    const inputEl = screen.getByTestId('dropzone-input');
    Object.defineProperty(inputEl, 'files', {
      value: [file],
    });
    fireEvent.drop(inputEl);

    await waitFor(() =>
      expect(screen.getByText('a-file.json')).toBeInTheDocument()
    );
  });

  it('should remove a file that was previously loaded', async () => {
    render(<DropzoneScreen />);
    const inputEl = screen.getByTestId('dropzone-input');
    Object.defineProperty(inputEl, 'files', {
      value: [file],
    });
    fireEvent.drop(inputEl);

    await waitFor(() =>
      expect(screen.getByText('a-file.json')).toBeInTheDocument()
    );

    fireEvent.click(screen.getByTestId('DeleteIcon'));

    await waitFor(() =>
      expect(screen.queryByText('a-file.json')).not.toBeInTheDocument()
    );
  });

  it('should call the service for uploading the file and display a success notification', async () => {
    render(<DropzoneScreen />);
    const inputEl = screen.getByTestId('dropzone-input');
    Object.defineProperty(inputEl, 'files', {
      value: [file],
    });
    fireEvent.drop(inputEl);

    await waitFor(() =>
      expect(screen.getByText('a-file.json')).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText('Upload files'));

    await waitFor(() =>
      expect(screen.queryByText('a-file.json')).not.toBeInTheDocument()
    );
    expect(upload).toHaveBeenCalledTimes(1);
    expect(upload).toHaveBeenCalledWith(file);
    expect(screen.getByText('Files uploaded')).toBeVisible();
  });

  it('should display an error notification when the upload fails', async () => {
    upload.mockRejectedValue(new Error('Error!'));

    render(<DropzoneScreen />);
    const inputEl = screen.getByTestId('dropzone-input');
    Object.defineProperty(inputEl, 'files', {
      value: [file],
    });
    fireEvent.drop(inputEl);

    await waitFor(() =>
      expect(screen.getByText('a-file.json')).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText('Upload files'));

    await waitFor(() =>
      expect(screen.queryByText('a-file.json')).toBeInTheDocument()
    );
    expect(upload).toHaveBeenCalledTimes(1);
    expect(upload).toHaveBeenCalledWith(file);
    expect(
      screen.getByText('An error has ocurred, please try again')
    ).toBeVisible();
  });

  it('should hide notifications after 3 seconds', async () => {
    render(<DropzoneScreen />);
    const inputEl = screen.getByTestId('dropzone-input');
    Object.defineProperty(inputEl, 'files', {
      value: [file],
    });
    fireEvent.drop(inputEl);

    await waitFor(() =>
      expect(screen.getByText('a-file.json')).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText('Upload files'));

    await waitFor(() =>
      expect(screen.getByText('Files uploaded')).toBeVisible()
    );
    await waitFor(
      () => expect(screen.queryByText('Files uploaded')).not.toBeVisible(),
      {timeout: 4000}
    );
  });
});
