import React, { useEffect, useState } from 'react';
import useRequest from 'src/hooks/useRequest';
import cakesApi from 'src/api/requests/cakesApi';
import { DeviceItemModel } from 'src/api/models/DeviceItemModel';
import styles from './AdministrationRecipesViewById.styl';
import { AdminPageMode } from 'src/pages/AdministrationPage/AdministrationRecipes/AdministrationRecipes';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { setCake } from 'src/redux/features/cake/CakeSlice';
import { useNavigate } from 'react-router-dom';
import { PrivateRoutesEnum } from 'src/router';
import { Button } from '@consta/uikit/Button';

interface IComponentProps {
  activeList: number | null;
  pageMode: AdminPageMode;
  setPageMode: React.Dispatch<React.SetStateAction<AdminPageMode>>;
}

const AdministrationRecipesViewById: React.FC<IComponentProps> = ({
  activeList,
  setPageMode,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [device, setDevice] = useState<DeviceItemModel | null>(null);

  const { load: fetchRecipe, isLoading } = useRequest(
    cakesApi.loadRecipe,
    (data) => {
      if (data) {
        setDevice(data);
        dispatch(setCake(data));
      }
    },
  );

  const removeCake = async () => {
    if (device) {
      await cakesApi.removeCake(device.id.toString()).then(() => {
        setDevice(null);
      });
    }
  };

  useEffect(() => {
    if (activeList) {
      fetchRecipe(activeList.toString());
    }
  }, [activeList]);
  return (
    <>
      {device && (
        <div>
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
          <div className={styles.Footer}>
            <Button
              onClick={() => {
                navigate(
                  `${PrivateRoutesEnum.ADMINISTRATION}/${PrivateRoutesEnum.RECIPES}/edit`,
                );
              }}
              label={'Редактировать'}
            />
            <Button onClick={() => removeCake()} label={'Удалить'} />
          </div>
        </div>
      )}
    </>
  );
};

export default AdministrationRecipesViewById;