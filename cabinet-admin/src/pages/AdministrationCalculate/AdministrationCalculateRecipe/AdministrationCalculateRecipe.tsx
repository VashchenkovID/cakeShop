import React, { useMemo, useState } from "react";
import { DeviceItemModel } from "src/api/models/DeviceItemModel";
import { Text } from "@consta/uikit/Text";
import styles from "./AdministrationCalculateRecipe.module.styl";

interface IComponentProps {
  isCalculate?: boolean;
  recipe: DeviceItemModel;
  count: number;
}

const AdministrationCalculateRecipe: React.FC<IComponentProps> = ({
  isCalculate,
  recipe,
  count,
}) => {
  const calcRecipe = useMemo(() => {
    if (isCalculate) {
      return {
        ...recipe,
        info: recipe.info.map((i) => {
          return { ...i, weight: Number(i.weight) * count };
        }),
      };
    } else return recipe;
  }, [recipe, isCalculate, count]);
  return (
    <div>
      <Text size={"l"}>
        {isCalculate ? "Расчет рецепта" : "Рецепт на 1 единицу"}
      </Text>
      <div className={styles.FullRecipe__rightSide}>
        <div className={styles.FullRecipe__rightSide__header}>
          <Text
            weight={"semibold"}
            className={styles.FullRecipe__rightSide__list__row__col}
          >
            Наименование
          </Text>
          <Text
            weight={"semibold"}
            className={styles.FullRecipe__rightSide__list__row__col}
          >
            Кол-во
          </Text>
          <Text
            weight={"semibold"}
            className={styles.FullRecipe__rightSide__list__row__col}
          >
            Единица измерения
          </Text>
        </div>
        <div className={styles.FullRecipe__rightSide__list}>
          {calcRecipe.info &&
            calcRecipe.info.length > 0 &&
            calcRecipe.info.map((item, index) => (
              <div
                key={index}
                className={styles.FullRecipe__rightSide__list__row}
              >
                <Text
                  className={styles.FullRecipe__rightSide__list__row__col}
                  weight={"semibold"}
                >
                  {item.name}
                </Text>
                <Text
                  weight={"semibold"}
                  className={styles.FullRecipe__rightSide__list__row__col}
                >
                  {item.weight}
                </Text>
                <Text
                  weight={"semibold"}
                  className={styles.FullRecipe__rightSide__list__row__col}
                >
                  {item.weightType}
                </Text>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AdministrationCalculateRecipe;
