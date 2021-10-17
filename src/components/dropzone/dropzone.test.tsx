import React from 'react';
import {render, screen} from '@testing-library/react';
import {createMatchMedia} from 'test-utils';
import Dropzone from '.';

describe('<Dropzone />', () => {
  beforeEach(() => {
    window.matchMedia = createMatchMedia(1280);
  });

  it('should have a dashed border', () => {
    render(<Dropzone inputProps={{}} isDragActive={false} rootProps={{}} />);

    expect(screen.getByTestId('dropzone-component')).toHaveStyle({
      'border-color': '#bdbdbd',
    });
  });

  it('should change the color of the dashed border', () => {
    render(<Dropzone inputProps={{}} isDragActive rootProps={{}} />);

    expect(screen.getByTestId('dropzone-component')).toHaveStyle({
      'border-color': '#7b1fa2',
    });
  });

  it('should render the default text of the dropzone', () => {
    render(<Dropzone inputProps={{}} isDragActive={false} rootProps={{}} />);

    expect(
      screen.getByText("Drag 'n' drop your files here or click to select")
    ).toBeInTheDocument();
  });

  it('should change the text text of the dropzone if it is render on a mobile device', () => {
    window.matchMedia = createMatchMedia(480);

    render(<Dropzone inputProps={{}} isDragActive={false} rootProps={{}} />);

    expect(screen.getByText('Press to select the file')).toBeInTheDocument();
  });
});
