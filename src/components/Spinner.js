import { CircularProgress } from '@material-ui/core';
import React from 'react';

export default function Spinner({ style, ...props }) {
  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        ...style
      }}
      {...props}
    >
      <CircularProgress />
    </div>
  );
}
