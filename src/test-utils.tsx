/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, {ReactElement} from 'react';
import {render as rtlRender, RenderResult} from '@testing-library/react';
import mediaQuery from 'css-mediaquery';
import {ColorModeProvider} from 'context/color-mode';

export const render = (
  ui: ReactElement,
  {...renderOptions}: any = {}
): RenderResult => {
  const Wrapper = ({children}: {children: ReactElement}) => (
    <ColorModeProvider>{children}</ColorModeProvider>
  );

  return rtlRender(ui, {wrapper: Wrapper, ...renderOptions});
};

export * from '@testing-library/react';

export const createMatchMedia = (width: number) => {
  return (query: string): any => ({
    matches: mediaQuery.match(query, {
      width,
    }),
    addListener: () => {},
    removeListener: () => {},
  });
};
