import React, { useMemo } from "react";
import styles from "./BasketWithCount.module.styl";
import { useNavigate } from "react-router-dom";
import { IconStorage } from "@consta/uikit/IconStorage";
import { useAppSelector } from "src/hooks/useAppSelector";
import { selectBasket } from "src/store/features/basket/BasketSelectors";
import { PublicRoutesEnum } from "src/utils/enum";

interface IComponentProps {
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const BasketWithCount: React.FC<IComponentProps> = ({ setIsOpen }) => {
  const basket = useAppSelector(selectBasket);
  const navigate = useNavigate();
  const countInOrder = useMemo(() => {
    if (basket) {
      return basket.items.reduce((accum, item) => accum + item.count, 0);
    } else return null;
  }, [basket]);
  return (
    <div
      onClick={() => {
        if (setIsOpen) {
          setIsOpen(false);
        }
        navigate(
          `${PublicRoutesEnum.VIEW_ORDER}/${PublicRoutesEnum.CREATE_ORDER}`
        );
      }}
      className={styles.Container}
    >
      <IconStorage className={styles.icon} view={"ghost"} />
      {countInOrder ? (
        <div className={styles.Container__cnt}>{countInOrder}</div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default BasketWithCount;
