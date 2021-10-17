import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ColorModeProvider} from 'context/color-mode';
import AppBar from '.';

describe('<AppBar />', () => {
  it('should toggle the color mode and change the mode icon', () => {
    render(
      <ColorModeProvider>
        <AppBar />
      </ColorModeProvider>
    );

    userEvent.click(screen.getByTestId('Brightness4Icon'));

    expect(screen.queryByTestId('Brightness4Icon')).not.toBeInTheDocument();
    expect(screen.getByTestId('Brightness7Icon')).toBeInTheDocument();
  });
});
