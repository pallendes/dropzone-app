import React from 'react';
import {render, screen} from '@testing-library/react';
import FilesList from '.';

describe('files-list', () => {
  const files: Array<File> = [
    new File([JSON.stringify({ping: true})], 'a-file.json', {
      type: 'application/json',
    }),
  ];

  it('should render the items', () => {
    render(
      <FilesList files={files} onFileRemoved={jest.fn()} isUplaoding={false} />
    );

    expect(screen.getByText('a-file.json')).toBeInTheDocument();
  });

  it('should display a progress icon if the uploading prop is set', () => {
    render(<FilesList files={files} onFileRemoved={jest.fn()} isUplaoding />);

    expect(screen.getByText('a-file.json')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
