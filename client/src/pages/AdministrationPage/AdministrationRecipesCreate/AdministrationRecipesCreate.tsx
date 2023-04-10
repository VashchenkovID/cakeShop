import React, { useEffect, useState } from 'react';
import cakesApi from '../../../api/requests/cakesApi';
import styles from './AdministrationRecipesCreate.styl';
import cn from 'classnames/bind';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { selectCakeItem } from 'src/redux/features/cake/CakeSelectors';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Select } from 'antd';
import { PrivateRoutesEnum } from 'src/router';
import useRequest from 'src/hooks/useRequest';

const cx = cn.bind(styles);

const AdministrationRecipesCreate: React.FC = () => {
  const editCake = useAppSelector(selectCakeItem);
  const location = useLocation();
  const navigate = useNavigate();
  const [types, setTypes] = useState([]);
  const [fillings, setFillings] = useState([]);
  const [device, setDevice] = useState<any>({
    name: '',
    price: 0,
    description: '',
    info: [],
    img: '',
    typeId: null,
  });
  const [type, setType] = useState(null);
  const [filling, setFilling] = useState(null);
  const [file, setFile] = useState(null);
  const [renderImage, setRenderImage] = useState('');

  const addDevice = async () => {
    try {
      const formData = new FormData();
      formData.append('name', device.name);
      formData.append('price', `${device.price}`);
      formData.append('description', `${device.description}`);
      formData.append('img', file);
      formData.append('typeId', type);
      formData.append('fillingId', filling);
      formData.append('info', JSON.stringify(device.info));
      await cakesApi.createCake(formData).then(() => {
        navigate(
          `${PrivateRoutesEnum.ADMINISTRATION}/${PrivateRoutesEnum.RECIPES}`,
        );
      });
    } catch (e) {
      alert(e.message);
    }
  };

  const EditDevice = async () => {
    try {
      const formData = new FormData();
      formData.append('name', device.name);
      formData.append('price', `${device.price}`);
      formData.append('description', `${device.description}`);
      formData.append('img', file);
      formData.append('typeId', type);
      formData.append('fillingId', filling);
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
  const selectFile = (e: any) => {
    setFile(e.target.files[0]);
    const src = URL.createObjectURL(e.target.files[0]);
    setRenderImage(src.slice(5));
  };
  const { load: fetchTypes, isLoading: typeLoading } = useRequest(
    cakesApi.getCakeTypes,
    (data) => {
      if (data) {
        setTypes(
          data.data.map((item: any) => {
            return { value: item.id, label: item.name };
          }),
        );
      }
    },
  );

  const { load: fetchFillings, isLoading: fillingLoading } = useRequest(
    cakesApi.getCakeFillings,
    (data) => {
      if (data) {
        setFillings(
          data.data.map((item: any) => {
            return { value: item.id, label: item.name, ...item };
          }),
        );
      }
    },
  );

  useEffect(() => {
    fetchTypes();
    fetchFillings();
  }, []);

  useEffect(() => {
    if (location.pathname.includes('edit') && editCake) {
      setDevice({
        name: editCake.name,
        price: editCake.price,
        description: editCake.description,
        info: editCake.info,
        img: editCake.img,
        typeId: editCake.TypeId,
      });
      setRenderImage(`http://localhost:8081/${editCake.img}`);
      if (types.length > 0) {
        setType(types.find((item) => item.value === editCake.TypeId).value);
      }
      if (fillings.length > 0) {
        setFilling(
          fillings.find((item) => item.value === editCake.FillingId).value,
        );
      }
    }
  }, [location, types, fillings]);
  return (
    <div className={styles.RecipeCreate}>
      <div className={styles.RecipeCreate__leftSide}>
        <input type={'file'} onChange={selectFile} />
        {renderImage !== '' && (
          <img
            className={styles.RecipeCreate__image}
            src={renderImage}
            alt="Ошибка"
          />
        )}
        {types.length > 0 && (
          <Select options={types} value={type} onChange={(e) => setType(e)} />
        )}
        {fillings.length > 0 && (
          <Select
            options={fillings}
            value={filling}
            onChange={(e) => setFilling(e)}
          />
        )}

        <input
          value={device?.name}
          onChange={(e) => {
            setDevice((prevState: any) => {
              return { ...prevState, name: e.target.value };
            });
          }}
        />
        <input
          type={'number'}
          value={device?.price}
          onChange={(e) => {
            setDevice((prevState: any) => {
              return { ...prevState, price: e.target.value };
            });
          }}
        />
        <input
          value={device.description}
          onChange={(e) => {
            setDevice((prevState: any) => {
              return { ...prevState, description: e.target.value };
            });
          }}
        />
      </div>
      <div className={styles.RecipeCreate__rightSide}>
        <div>
          <h3>Рецепт:</h3>
          <div>
            {device.info.length > 0 &&
              device.info.map((rec: any, ind: number) => (
                <div key={ind}>
                  <div>
                    <input
                      placeholder={'Наименование'}
                      value={rec.name}
                      onChange={(e) => {
                        setDevice((prev: any) => {
                          return {
                            ...prev,
                            info: prev.info.map((itm: any, idx: number) => {
                              if (idx === ind) {
                                return { ...itm, name: e.target.value };
                              } else return { ...itm };
                            }),
                          };
                        });
                      }}
                    />
                  </div>
                  <div>
                    <input
                      placeholder={'Вес'}
                      value={rec.weight}
                      onChange={(e) => {
                        setDevice((prev: any) => {
                          return {
                            ...prev,
                            info: prev.info.map((itm: any, idx: number) => {
                              if (idx === ind) {
                                return { ...itm, weight: e.target.value };
                              } else return { ...itm };
                            }),
                          };
                        });
                      }}
                    />
                  </div>
                  <div>
                    <input
                      placeholder={'Вес'}
                      value={rec.pricePerUnit}
                      onChange={(e) => {
                        setDevice((prev: any) => {
                          return {
                            ...prev,
                            info: prev.info.map((itm: any, idx: number) => {
                              if (idx === ind) {
                                return { ...itm, pricePerUnit: e.target.value };
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
                    />
                  </div>
                </div>
              ))}
          </div>
          <button
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
                      pricePerUnit: '0',
                      device: { id: editCake ? editCake.id : null },
                    },
                  ],
                };
              });
            }}
          >
            Добавить строчку
          </button>
        </div>
        <Button
          onClick={(e) => {
            if (location.pathname.includes('create')) {
              addDevice();
            } else EditDevice();
          }}
        >
          {location.pathname.includes('create') ? 'Создать' : 'Сохранить'}
        </Button>
      </div>
    </div>
  );
};

export default AdministrationRecipesCreate;
