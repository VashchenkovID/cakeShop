import React, { useEffect, useState } from 'react';
import useRequest from 'src/hooks/useRequest';
import cakesApi from 'src/api/requests/cakesApi';
import { DeviceItemModel } from 'src/api/models/DeviceItemModel';
import styles from './AdministrationRecipesViewById.styl';
import { AdminPageMode } from 'src/pages/AdministrationRecipes/AdministrationRecipes';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { setCake } from 'src/redux/features/cake/CakeSlice';
import { useNavigate } from 'react-router-dom';
import { PrivateRoutesEnum } from 'src/router';
import { Button } from '@consta/uikit/Button';
import { Text } from '@consta/uikit/Text';
import IconColorStar from 'src/components/IconStar/IconColorStar';
import { Informer } from '@consta/uikit/Informer';
import InformerBadge from 'src/components/Informer/Informer';

interface IComponentProps {
  activeList: number | null;
  pageMode: AdminPageMode;
  setPageMode: React.Dispatch<React.SetStateAction<AdminPageMode>>;
}

const AdministrationRecipesViewById: React.FC<IComponentProps> = ({
  activeList,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [device, setDevice] = useState<DeviceItemModel | null>(null);

  const { load: fetchRecipe } = useRequest(cakesApi.loadRecipe, (data) => {
    if (data) {
      setDevice(data);
      dispatch(setCake(data));
    }
  });

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
              <div className={styles.FullRecipe__leftSide__title}>
                <img
                  className={styles.FullRecipe__leftSide__img}
                  src={`${process.env.REACT_APP_IMAGE}${device.img}`}
                />
                <div className={styles.FullRecipe__leftSide__deviceDescription}>
                  <Text size={'4xl'}>{device.name}</Text>
                  <Text>
                    Создан:{new Date(device.createdAt).toLocaleDateString()}
                  </Text>

                  <Text weight={'semibold'} size={'l'}>
                    {`Продажа от: ${device.countWeightType} ${device.weightType}`}
                  </Text>
                  {device.rating && (
                    <Text
                      className={styles.rating}
                      weight={'semibold'}
                      size={'l'}
                    >
                      Рейтинг: {device.rating?.toFixed(2)} <IconColorStar />
                    </Text>
                  )}

                  <Text weight={'semibold'} size={'l'}>
                    Цена: {device.price},00 ₽
                  </Text>
                </div>
              </div>

              <Text view={'secondary'}>{device.description}</Text>
            </div>
            <div className={styles.FullRecipe__rightSide}>
              <Text size={'3xl'}>Рецепт на 1 единицу</Text>
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
                  Кол-во
                </Text>
                <Text
                  weight={'semibold'}
                  className={styles.FullRecipe__rightSide__list__row__col}
                >
                  Единица измерения
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
              <div className={styles.FullRecipe__rightSide__list}>
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
                        {item.weightType}
                      </Text>
                      <Text
                        weight={'semibold'}
                        className={styles.FullRecipe__rightSide__list__row__col}
                      >
                        {item.pricePerUnit} ₽
                      </Text>
                      <Text
                        weight={'semibold'}
                        className={styles.FullRecipe__rightSide__list__row__col}
                      >
                        {(item.pricePerUnit * Number(item.weight)).toFixed(2)} ₽
                      </Text>
                    </div>
                  ))}
              </div>

              <Text
                className={styles.FullRecipe__summing}
                weight={'semibold'}
                size={'l'}
              >
                Итого:
                {device.info?.reduce(
                  (accum, item) =>
                    accum + item.pricePerUnit * Number(item.weight),
                  0,
                )}{' '}
                ₽
              </Text>
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
      <div>
        {!activeList && (
          <InformerBadge text={'Выберите рецепт из меню слева'} />
        )}
      </div>
    </>
  );
};

export default AdministrationRecipesViewById;
