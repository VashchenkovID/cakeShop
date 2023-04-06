import React, { useEffect, useState } from 'react';
import useRequest from 'src/hooks/useRequest';
import cakesApi from 'src/api/requests/cakesApi';
import { DeviceItemModel } from 'src/api/models/DeviceItemModel';
import styles from './AdministrationRecipesViewById.styl';

interface IComponentProps {
  activeList: number | null;
}

const AdministrationRecipesViewById: React.FC<IComponentProps> = ({
  activeList,
}) => {
  const [device, setDevice] = useState<DeviceItemModel | null>(null);

  const { load: fetchRecipe, isLoading } = useRequest(
    cakesApi.loadRecipe,
    (data) => {
      if (data) {
        setDevice(data);
      }
    },
  );

  useEffect(() => {
    if (activeList) {
      fetchRecipe(activeList.toString());
    }
  }, [activeList]);
  return (
    <>
      {device && (
        <div className={styles.FullRecipe}>
          <div className={styles.FullRecipe__leftSide}>
            <img
              className={styles.FullRecipe__leftSide__img}
              src={`http://localhost:8081/${device.img}`}
            />
            <h2>{device.name}</h2>
            <p>{device.description}</p>
            <div>
              Создан: ${new Date(device.createdAt).toLocaleDateString()}
            </div>
            <div>
              <div>{device.rating}</div>
              <div>{device.price}</div>
            </div>
          </div>
          <div className={styles.FullRecipe__rightSide}>
            <h2>Рецепт</h2>
            <div className={styles.FullRecipe__rightSide__header}>
              <div className={styles.FullRecipe__rightSide__list__row__col}>
                Наименование
              </div>
              <div className={styles.FullRecipe__rightSide__list__row__col}>
                Вес
              </div>
              <div className={styles.FullRecipe__rightSide__list__row__col}>
                Стоимость за единицу
              </div>
              <div className={styles.FullRecipe__rightSide__list__row__col}>
                Общая стоимость
              </div>
            </div>
            <div>
              {device.info &&
                device.info.length > 0 &&
                device.info.map((item, index) => (
                  <div
                    key={index}
                    className={styles.FullRecipe__rightSide__list__row}
                  >
                    <div
                      className={styles.FullRecipe__rightSide__list__row__col}
                    >
                      {item.name}
                    </div>
                    <div
                      className={styles.FullRecipe__rightSide__list__row__col}
                    >
                      {item.weight}
                    </div>
                    <div
                      className={styles.FullRecipe__rightSide__list__row__col}
                    >
                      {item.pricePerUnit}
                    </div>
                    <div
                      className={styles.FullRecipe__rightSide__list__row__col}
                    >
                      посчитать
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdministrationRecipesViewById;
