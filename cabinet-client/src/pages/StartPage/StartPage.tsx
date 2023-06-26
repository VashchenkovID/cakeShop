import React, { useEffect } from "react";
import styles from "./StartPage.module.styl";
import useRequest from "../../hooks/useRequest";
import cakesApi from "../../api/requests/cakesApi";

interface IComponentProps {}

const StartPage: React.FC<IComponentProps> = () => {
  const { load: fetchStart } = useRequest(cakesApi.getStart, (data) => {
    console.log(data?.data);
  });
  useEffect(() => {
    fetchStart();
  }, []);
  return <section className={styles.container}></section>;
};

export default React.memo(StartPage);
