import React from 'react';
import styles from './ComponentStyleWrapper.styl';

const ComponentStyleWrapper: React.FC = ({ children }) => {
  return <div className={styles.Wrapper}>{children}</div>;
};

export default ComponentStyleWrapper;
