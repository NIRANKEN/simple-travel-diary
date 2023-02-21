import React from 'react';
import { CircularProgress } from '../CircularProgress';
import { render, screen } from '@testing-library/react';

describe('CircularProgress', () => {
  describe('useWindowHeight is false', () => {
    it('should not have height', () => {
      render(<CircularProgress />);
      const muiProgress = screen.queryByRole('progressbar');
      expect(muiProgress).toBeInTheDocument();
      expect(screen.queryByTestId('circular-progress-box')).not.toHaveStyle(`height: calc(100vh - 112px)`);
    });
  });
  describe('useWindowHeight is true', () => {
    it('should have height', () => {
      render(<CircularProgress useWindowHeight={true} />);
      const muiProgress = screen.queryByRole('progressbar');
      expect(muiProgress).toBeInTheDocument();
      expect(screen.queryByTestId('circular-progress-box')).toHaveStyle('height: calc(100vh - 112px)');
    });
  });
});
