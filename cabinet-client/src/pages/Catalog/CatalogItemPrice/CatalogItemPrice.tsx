import React, { useMemo } from "react";
import { Text } from "@consta/uikit/Text";
import styles from "./CatalogItemPrice.module.styl";

interface IComponentProps {
  price: number;
  countWeightType: number;
  discount: number;
}

const CatalogItemPrice: React.FC<IComponentProps> = ({
  price,
  countWeightType,
  discount,
}) => {
  const itemWithDiscountPrice = useMemo(() => {
    if (discount === 0) {
      return null;
    } else {
      return (
        price * countWeightType + price * countWeightType * discount * 0.01
      );
    }
  }, []);
  const itemPrice = price * countWeightType;
  return (
    <>
      {discount === 0 ? (
        <Text>{price * countWeightType},00 ₽</Text>
      ) : (
        <div className={styles.Price}>
          <Text>{itemPrice},00 ₽</Text>
          <Text>/</Text>
          <Text
            view={"secondary"}
            size={"xs"}
            style={{ textDecoration: "line-through" }}
          >{`${itemWithDiscountPrice},00 ₽`}</Text>
        </div>
      )}
    </>
  );
};

export default CatalogItemPrice;
