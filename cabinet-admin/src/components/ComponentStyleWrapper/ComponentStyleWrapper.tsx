import React from 'react';
import styles from './ComponentStyleWrapper.module.styl';

const ComponentStyleWrapper: React.FC = ({ children }) => {
  return <div className={styles.Wrapper}>{children}</div>;
};

export default ComponentStyleWrapper;
