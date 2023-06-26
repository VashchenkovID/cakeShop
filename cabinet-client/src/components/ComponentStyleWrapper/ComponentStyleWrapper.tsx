import React from "react";
import styles from "./ComponentStyleWrapper.module.styl";

interface IComponentProps {
  children: React.ReactNode;
}

const ComponentStyleWrapper: React.FC<IComponentProps> = ({ children }) => {
  return <div className={styles.Wrapper}>{children}</div>;
};

export default ComponentStyleWrapper;
