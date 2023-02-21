import React from 'react';
import PropTypes from 'prop-types';
import MuiCircularProgress, {
  CircularProgressProps as MuiCircularProgressProps,
} from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// TODO: any型の修正

interface CircularProgressBaseProps {
  useWindowHeight?: boolean;
  suffix?: string;
}

type CircularProgressProps = CircularProgressBaseProps &
  MuiCircularProgressProps;

export const CircularProgress: React.FC<CircularProgressProps> = ({
  useWindowHeight = false,
  suffix,
  ...props
}) => {
  return (
    <Box
      data-testid={
        suffix ? `circular-progress-${suffix}` : 'circular-progress-box'
      }
      sx={{
        p: 1,
        m: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: useWindowHeight ? 'calc(100vh - 112px)' : null,
      }}
    >
      <MuiCircularProgress {...props} />
    </Box>
  );
};

CircularProgress.propTypes = {
  useWindowHeight: PropTypes.bool,
};
