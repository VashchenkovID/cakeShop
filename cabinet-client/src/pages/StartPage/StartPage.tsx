import React from "react";
import styles from "./StartPage.module.styl";

interface IComponentProps {}

const StartPage: React.FC<IComponentProps> = () => {
  return <section className={styles.container}></section>;
};

export default React.memo(StartPage);
