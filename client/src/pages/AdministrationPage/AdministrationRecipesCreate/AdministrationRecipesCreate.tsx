import React, { useEffect, useState } from 'react';
import cakesApi from '../../../api/requests/cakesApi';
import styles from './AdministrationRecipesCreate.styl';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { selectCakeItem } from 'src/redux/features/cake/CakeSelectors';
import { useLocation, useNavigate } from 'react-router-dom';
import { PrivateRoutesEnum } from 'src/router';
import useRequest from 'src/hooks/useRequest';
import { Select } from '@consta/uikit/Select';
import { Button } from '@consta/uikit/Button';
import { Text } from '@consta/uikit/Text';
import { DragNDropField } from '@consta/uikit/DragNDropField';
import { TextField } from '@consta/uikit/TextField';
import { IconTrash } from '@consta/uikit/IconTrash';

const AdministrationRecipesCreate: React.FC = () => {
  const editCake = useAppSelector(selectCakeItem);
  const location = useLocation();
  const navigate = useNavigate();
  const [types, setTypes] = useState([]);
  const [fillings, setFillings] = useState([]);
  const [biscuits, setBiscuits] = useState([]);
  const [device, setDevice] = useState<any>({
    name: '',
    price: 0,
    description: '',
    info: [],
    img: '',
    discount: 0,
    weightType: '',
    countWeightType: 0,
  });
  const [type, setType] = useState(null);
  const [filling, setFilling] = useState(null);
  const [biscuit, setBiscuit] = useState(null);
  const [file, setFile] = useState(null);
  const [renderImage, setRenderImage] = useState('');

  const addDevice = async () => {
    try {
      const formData = new FormData();
      formData.append('name', device.name);
      formData.append('price', `${device.price}`);
      formData.append('description', `${device.description}`);
      formData.append('weightType', `${device.weightType}`);
      formData.append('countWeightType', `${device.countWeightType}`);
      formData.append('img', file);
      formData.append('typeId', type.id);
      formData.append('fillingId', filling.id);
      formData.append('discount', device.discount);
      formData.append('biscuitId', biscuit.id);
      formData.append('info', JSON.stringify(device.info));
      await cakesApi.createCake(formData).then(() => {
        navigate(
          `${PrivateRoutesEnum.ADMINISTRATION}/${PrivateRoutesEnum.RECIPES}`,
        );
      });
    } catch (e) {
      console.error(e.message);
    }
  };

  const EditDevice = async () => {
    try {
      const formData = new FormData();
      formData.append('name', device.name);
      formData.append('price', `${device.price}`);
      formData.append('description', `${device.description}`);
      formData.append('weightType', `${device.weightType}`);
      formData.append('countWeightType', `${device.countWeightType}`);
      formData.append('img', file);
      formData.append('typeId', type.id);
      formData.append('fillingId', filling.id);
      formData.append('discount', device.discount);
      formData.append('biscuitId', biscuit.id);
      formData.append('info', JSON.stringify(device.info));
      await cakesApi.editCake(editCake.id.toString(), formData).then(() => {
        navigate(
          `${PrivateRoutesEnum.ADMINISTRATION}/${PrivateRoutesEnum.RECIPES}`,
        );
      });
    } catch (e) {
      alert(e.message);
    }
  };
  const { load: fetchTypes } = useRequest(cakesApi.getCakeTypes, (data) => {
    if (data) {
      setTypes(data.data);
    }
  });

  const { load: fetchFillings } = useRequest(
    cakesApi.getCakeFillings,
    (data) => {
      if (data) {
        setFillings(data.data);
      }
    },
  );

  const { load: fetchBiscuits } = useRequest(cakesApi.getBiscuits, (data) => {
    if (data) {
      setBiscuits(data.data);
    }
  });
  useEffect(() => {
    fetchTypes();
    fetchFillings();
    fetchBiscuits();
  }, []);

  useEffect(() => {
    if (location.pathname.includes('edit') && editCake) {
      setDevice({
        name: editCake.name,
        price: editCake.price,
        description: editCake.description,
        info: editCake.info,
        img: editCake.img,
        discount: editCake.discount,
        weightType: editCake.weightType,
        countWeightType: editCake.countWeightType,
      });
      setRenderImage(`${process.env.REACT_APP_IMAGE}${editCake.img}`);
      if (types.length > 0) {
        setType(types.find((item) => item.id === editCake.TypeId));
      }
      if (fillings.length > 0) {
        setFilling(fillings.find((item) => item.id === editCake.FillingId));
      }
      if (biscuits.length > 0) {
        setBiscuit(biscuits.find((item) => item.id === editCake.BiscuitId));
      }
    }
  }, [location, types, fillings]);

  return (
    <div className={styles.RecipeCreate}>
      <div className={styles.RecipeCreate__leftSide}>
        <DragNDropField
          multiple={false}
          onDropFiles={(file) => {
            setFile(file[0]);
            const src = URL.createObjectURL(file[0]);
            setRenderImage(src.slice(5));
          }}
        >
          {({ openFileDialog }) => (
            <>
              <Text size={'l'}>Выберите или перетащите фотографию десерта</Text>
              <Text size={'s'} view={'secondary'}>
                Поддерживаются файлы форматов jpg,png,jpeg
              </Text>
              <Button onClick={openFileDialog} label="Выбрать файл" />
            </>
          )}
        </DragNDropField>
        {renderImage !== '' && (
          <img
            className={styles.RecipeCreate__image}
            src={renderImage}
            alt="Ошибка"
          />
        )}
        <div className={styles.Recipe__compound}>
          <Text>Состав:</Text>
          <div className={styles.RecipeCreate__compound__selects}>
            {types.length > 0 && (
              <Select
                size={'s'}
                form={'round'}
                label={'Десерт'}
                placeholder={'Выберите тип десерта'}
                items={types}
                getItemLabel={(i) => i.name}
                value={type}
                onChange={(value) => setType(value.value)}
              />
            )}
            {fillings.length > 0 && (
              <Select
                size={'s'}
                form={'round'}
                label={'Начинка'}
                placeholder={'Выберите начинку'}
                items={fillings}
                getItemLabel={(i) => i.name}
                value={filling}
                onChange={(value) => setFilling(value.value)}
              />
            )}
            {biscuits.length > 0 && (
              <Select
                size={'s'}
                form={'round'}
                label={'Бисквит'}
                placeholder={'Выберите бисквит'}
                items={biscuits}
                getItemLabel={(i) => i.name}
                value={biscuit}
                onChange={(value) => setBiscuit(value.value)}
              />
            )}
          </div>
        </div>
        <div className={styles.RecipeCreate__compound__selects}>
          <TextField
            size={'s'}
            form={'round'}
            label={'Стартовая единица измерения'}
            placeholder={'Введите стартовое кол-во'}
            value={device?.weightType}
            onChange={({ value }) => {
              setDevice((prevState: any) => {
                return { ...prevState, weightType: value };
              });
            }}
          />
          <TextField
            size={'s'}
            form={'round'}
            type={'number'}
            label={'Стартовое кол-во для заказа'}
            placeholder={'Введите стартовое кол-во'}
            value={device?.countWeightType}
            onChange={({ value }) => {
              setDevice((prevState: any) => {
                return { ...prevState, countWeightType: value };
              });
            }}
          />
          <TextField
            size={'s'}
            form={'round'}
            label={'Цена'}
            placeholder={'Введите цену'}
            type={'number'}
            value={device?.price}
            onChange={(value) => {
              setDevice((prevState: any) => {
                return { ...prevState, price: value.value };
              });
            }}
          />
          <TextField
            size={'s'}
            form={'round'}
            min={0}
            max={100}
            label={'Скидка'}
            placeholder={'Введите скидку если есть'}
            type={'number'}
            value={device?.discount}
            onChange={({ value }) => {
              if (value) {
                if (Number(value) > 99) {
                  setDevice((prevState: any) => {
                    return { ...prevState, discount: '100' };
                  });
                } else if (value.includes('-')) {
                  setDevice((prevState: any) => {
                    return { ...prevState, discount: '0' };
                  });
                } else
                  setDevice((prevState: any) => {
                    return { ...prevState, discount: value };
                  });
              } else
                setDevice((prevState: any) => {
                  return { ...prevState, discount: '' };
                });
            }}
          />
        </div>
        <TextField
          size={'s'}
          form={'round'}
          label={'Наименование'}
          placeholder={'Введите наименование'}
          value={device?.name}
          onChange={(value) => {
            setDevice((prevState: any) => {
              return { ...prevState, name: value.value };
            });
          }}
        />

        <TextField
          size={'s'}
          label={'Описание'}
          type={'textarea'}
          rows={10}
          cols={70}
          placeholder={'Подробно опишите изделие'}
          form={'round'}
          value={device.description}
          onChange={(value) => {
            setDevice((prevState: any) => {
              return { ...prevState, description: value.value };
            });
          }}
        />
      </div>
      <div className={styles.RecipeCreate__rightSide}>
        <div>
          <Text size={'3xl'}>Рецепт:</Text>
          <div className={styles.Recipe}>
            {device.info.length > 0 &&
              device.info.map((rec: any, ind: number) => (
                <div className={styles.Recipe__row} key={ind}>
                  <TextField
                    size={'s'}
                    form={'round'}
                    label={'Наименование'}
                    placeholder={'Введите наименование ингредиента'}
                    value={rec.name}
                    onChange={(value) => {
                      setDevice((prev: any) => {
                        return {
                          ...prev,
                          info: prev.info.map((itm: any, idx: number) => {
                            if (idx === ind) {
                              return { ...itm, name: value.value };
                            } else return { ...itm };
                          }),
                        };
                      });
                    }}
                  />

                  <TextField
                    size={'s'}
                    form={'round'}
                    label={'Вес или количество'}
                    placeholder={'Введите вес и единицу измерения'}
                    value={rec.weight}
                    onChange={(value) => {
                      setDevice((prev: any) => {
                        return {
                          ...prev,
                          info: prev.info.map((itm: any, idx: number) => {
                            if (idx === ind) {
                              return { ...itm, weight: value.value };
                            } else return { ...itm };
                          }),
                        };
                      });
                    }}
                  />
                  <TextField
                    size={'s'}
                    form={'round'}
                    label={'Единица измерения'}
                    placeholder={'Введите единицу измерения'}
                    value={rec.weightType}
                    onChange={(value) => {
                      setDevice((prev: any) => {
                        return {
                          ...prev,
                          info: prev.info.map((itm: any, idx: number) => {
                            if (idx === ind) {
                              return { ...itm, weightType: value.value };
                            } else return { ...itm };
                          }),
                        };
                      });
                    }}
                  />

                  <TextField
                    size={'s'}
                    form={'round'}
                    label={'Цена за единицу'}
                    placeholder={'Введите цену за единицу ингредиента'}
                    value={rec.pricePerUnit}
                    onChange={(value) => {
                      setDevice((prev: any) => {
                        return {
                          ...prev,
                          info: prev.info.map((itm: any, idx: number) => {
                            if (idx === ind) {
                              return { ...itm, pricePerUnit: value.value };
                            } else return { ...itm };
                          }),
                        };
                      });
                    }}
                  />

                  <Button
                    onClick={() => {
                      setDevice((prev: any) => {
                        return {
                          ...prev,
                          info: prev.info.filter(
                            (it: any, idx: number) => idx !== ind,
                          ),
                        };
                      });
                    }}
                    className={styles.Recipe__row__button}
                    size={'s'}
                    iconLeft={IconTrash}
                  />
                </div>
              ))}
          </div>
          <Button
            className={styles.Recipe__addBtn}
            label={'Добавить строчку'}
            size={'xs'}
            onClick={() => {
              setDevice((prev: any) => {
                return {
                  ...prev,
                  info: [
                    ...prev.info,
                    {
                      id: null,
                      name: '',
                      weight: '',
                      weightType: '',
                      pricePerUnit: '',
                      device: { id: editCake ? editCake.id : null },
                    },
                  ],
                };
              });
            }}
          />
        </div>
        <Button
          onClick={() => {
            if (location.pathname.includes('create')) {
              addDevice();
            } else EditDevice();
          }}
          label={location.pathname.includes('create') ? 'Создать' : 'Сохранить'}
        />
      </div>
    </div>
  );
};

export default AdministrationRecipesCreate;
