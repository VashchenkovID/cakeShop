import React, { useEffect, useState } from "react";
import MainWrapper from "src/components/MainWrapper/MainWrapper";
import styles from "./AdministrationCalculate.module.styl";
import useRequest from "src/hooks/useRequest";
import entitiesApi from "src/api/requests/entitiesApi";
import { Select } from "@consta/uikit/Select";
import { EntityModel } from "src/api/models/EntityModel";
import cakesApi from "src/api/requests/cakesApi";
import { TextField } from "@consta/uikit/TextField";
import ComponentStyleWrapper from "src/components/ComponentStyleWrapper/ComponentStyleWrapper";
import AdministrationCalculateRecipe from "src/pages/AdministrationCalculate/AdministrationCalculateRecipe/AdministrationCalculateRecipe";
import { Text } from "@consta/uikit/Text";

const AdministrationCalculate: React.FC = () => {
  const {
    load: fetchItems,
    isLoading,
    data: devices,
  } = useRequest(entitiesApi.getDevices);
  const {
    load: fetchRecipe,
    isLoading: recipeLoad,
    data: recipe,
  } = useRequest(cakesApi.loadRecipe);
  const [device, setDevice] = useState<EntityModel | null>(null);
  const [count, setCount] = useState(1);
  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    if (device) {
      fetchRecipe(device.id.toString());
    }
  }, [device]);
  console.log(recipe);
  return (
    <MainWrapper title={"Расчет рецептуры"}>
      <ComponentStyleWrapper>
        <div className={styles.Container}>
          <div className={styles.Container__header}>
            <Select
              className={styles.Container__header__select}
              getItemLabel={(i) => i.name}
              getItemKey={(i) => i.id}
              label={"Десерт"}
              placeholder={"Выберите рецепт десерта"}
              size={"s"}
              form={"round"}
              items={devices?.data || []}
              onChange={({ value }) => setDevice(value)}
              value={device}
              isLoading={isLoading}
            />
            <TextField
              label={"Количество для расчёта"}
              placeholder={"Введите необходимое количество"}
              size={"s"}
              form={"round"}
              min={1}
              type={"number"}
              value={count.toString()}
              onChange={({ value }) => setCount(Number(value))}
            />
          </div>
          {recipe ? (
            <section className={styles.Container__content}>
              {!recipeLoad && (
                <AdministrationCalculateRecipe recipe={recipe} count={count} />
              )}
              {!recipeLoad && (
                <AdministrationCalculateRecipe
                  recipe={recipe}
                  count={count}
                  isCalculate
                />
              )}
            </section>
          ) : (
            <ComponentStyleWrapper>
              <Text align={"center"}>Выберите рецепт</Text>
            </ComponentStyleWrapper>
          )}
        </div>
      </ComponentStyleWrapper>
    </MainWrapper>
  );
};

export default AdministrationCalculate;
