import React, { useEffect, useState } from 'react';
import cakesApi from '../../../api/requests/cakesApi';
import styles from './AdministrationRecipesCreate.styl';
import cn from 'classnames/bind';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { selectCakeItem } from 'src/redux/features/cake/CakeSelectors';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { PrivateRoutesEnum } from 'src/router';

const cx = cn.bind(styles);

const AdministrationRecipesCreate: React.FC = () => {
  const editCake = useAppSelector(selectCakeItem);
  const location = useLocation();
  const navigate = useNavigate();

  const [device, setDevice] = useState<any>({
    name: '',
    price: 0,
    description: '',
    info: [],
    img: '',
    typeId: null,
  });
  const [type, setType] = useState(null);
  const [file, setFile] = useState(null);

  const addDevice = async () => {
    try {
      const formData = new FormData();
      formData.append('name', device.name);
      formData.append('price', `${device.price}`);
      formData.append('description', `${device.description}`);
      formData.append('img', file);
      formData.append('typeId', '1');
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
      formData.append('typeId', '1');
      formData.append('info', JSON.stringify(device.info));
      await cakesApi.editCake(editCake.id.toString(), formData);
    } catch (e) {
      alert(e.message);
    }
  };
  const selectFile = (e: any) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    if (location.pathname.includes('edit')) {
      setDevice({
        name: editCake.name,
        price: editCake.price,
        description: editCake.description,
        info: editCake.info,
        img: editCake.img,
        typeId: editCake.TypeId,
      });
    }
  }, [location]);
  return (
    <div className={styles.RecipeCreate}>
      <div className={styles.RecipeCreate__leftSide}>
        <input type={'file'} onChange={selectFile} />
        {/*<Form className={styles.formContainer}>*/}
        {/*  <Form.Control type="file" onChange={selectFile} />*/}
        {/*</Form>*/}
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
