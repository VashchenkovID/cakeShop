import React from 'react';
import style from './ScreenLoader.styl';
import { CircularProgress } from '@mui/material';

const ScreenLoader: React.FC = () => {
  return (
    <div className={style.loader}>
      <CircularProgress />
    </div>
  );
};

export default ScreenLoader;
