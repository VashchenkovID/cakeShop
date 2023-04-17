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
import { Text } from '@consta/uikit/Text';

interface IComponentProps {
  activeList: number | null;
  pageMode: AdminPageMode;
  setPageMode: React.Dispatch<React.SetStateAction<AdminPageMode>>;
}

const AdministrationRecipesViewById: React.FC<IComponentProps> = ({
  activeList,
  setPageMode,
}) => {
  const numbersFinder = /\d+/;
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
                src={`${process.env.REACT_APP_IMAGE}${device.img}`}
              />
              <Text size={'4xl'}>{device.name}</Text>
              <Text view={'secondary'}>{device.description}</Text>
              <Text>
                Создан:{new Date(device.createdAt).toLocaleDateString()}
              </Text>
              <div className={styles.footerRecipe}>
                <Text weight={'semibold'} size={'l'}>
                  Рейтинг: {device.rating}
                </Text>
                <Text weight={'semibold'} size={'l'}>
                  Цена: {device.price},00 ₽
                </Text>
              </div>
            </div>
            <div className={styles.FullRecipe__rightSide}>
              <Text size={'3xl'}>Рецепт</Text>
              <div className={styles.FullRecipe__rightSide__header}>
                <Text
                  weight={'semibold'}
                  className={styles.FullRecipe__rightSide__list__row__col}
                >
                  Наименование
                </Text>
                <Text
                  weight={'semibold'}
                  className={styles.FullRecipe__rightSide__list__row__col}
                >
                  Вес
                </Text>
                <Text
                  weight={'semibold'}
                  className={styles.FullRecipe__rightSide__list__row__col}
                >
                  Стоимость за единицу
                </Text>
                <Text
                  weight={'semibold'}
                  className={styles.FullRecipe__rightSide__list__row__col}
                >
                  Общая стоимость
                </Text>
              </div>
              <div>
                {device.info &&
                  device.info.length > 0 &&
                  device.info.map((item, index) => (
                    <div
                      key={index}
                      className={styles.FullRecipe__rightSide__list__row}
                    >
                      <Text
                        className={styles.FullRecipe__rightSide__list__row__col}
                        weight={'semibold'}
                      >
                        {item.name}
                      </Text>
                      <Text
                        weight={'semibold'}
                        className={styles.FullRecipe__rightSide__list__row__col}
                      >
                        {item.weight}
                      </Text>
                      <Text
                        weight={'semibold'}
                        className={styles.FullRecipe__rightSide__list__row__col}
                      >
                        {item.pricePerUnit},00 ₽
                      </Text>
                      <Text
                        weight={'semibold'}
                        className={styles.FullRecipe__rightSide__list__row__col}
                      >
                        {item.pricePerUnit *
                          Number(item.weight.match(numbersFinder))}
                        ,00 ₽
                      </Text>
                    </div>
                  ))}
              </div>
              <div className={styles.FullRecipe__rightSide__list__row}>
                <div></div>
                <div></div>
                <div></div>
                <Text
                  weight={'semibold'}
                  className={styles.FullRecipe__rightSide__list__row__col}
                >
                  Итого:
                  {device.info?.reduce(
                    (accum, item) =>
                      accum +
                      item.pricePerUnit *
                        Number(item.weight.match(numbersFinder)),
                    0,
                  )}{' '}
                  ₽
                </Text>
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
