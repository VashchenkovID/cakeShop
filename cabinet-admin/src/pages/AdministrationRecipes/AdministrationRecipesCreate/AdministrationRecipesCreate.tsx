import React, { useEffect, useMemo, useState } from "react";
import cakesApi from "../../../api/requests/cakesApi";
import styles from "./AdministrationRecipesCreate.module.styl";
import cn from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { PrivateRoutesEnum } from "src/router";
import useRequest from "src/hooks/useRequest";
import { Select } from "@consta/uikit/Select";
import { Button } from "@consta/uikit/Button";
import { Text } from "@consta/uikit/Text";
import { DragNDropField } from "@consta/uikit/DragNDropField";
import { TextField } from "@consta/uikit/TextField";
import { IconTrash } from "@consta/uikit/IconTrash";
import ComponentStyleWrapper from "src/components/ComponentStyleWrapper/ComponentStyleWrapper";
import { useParams } from "react-router";
import MainWrapper from "src/components/MainWrapper/MainWrapper";
import { toast } from "react-toastify";
import { TypeModel } from "src/api/models/TypeModel";
const cx = cn.bind(styles);
const AdministrationRecipesCreate: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [types, setTypes] = useState<TypeModel[]>([]);
  const [fillings, setFillings] = useState<
    { id: number; name: string; img: string }[]
  >([]);
  const [biscuits, setBiscuits] = useState<
    { id: number; name: string; img: string }[]
  >([]);
  const [device, setDevice] = useState<any>({
    name: "",
    price: 0,
    description: "",
    info: [],
    img: "",
    discount: 0,
    weightType: "",
    countWeightType: 0,
  });
  const [type, setType] = useState<TypeModel | null>(null);
  const [filling, setFilling] = useState<{
    id: number;
    name: string;
    img: string;
  } | null>(null);
  const [biscuit, setBiscuit] = useState<{
    id: number;
    name: string;
    img: string;
  } | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [renderImage, setRenderImage] = useState("");

  const addDevice = async () => {
    try {
      if (file && type && filling && biscuit) {
        const formData = new FormData();
        formData.append("name", device.name);
        formData.append("price", `${device.price}`);
        formData.append("description", `${device.description}`);
        formData.append("weightType", `${device.weightType}`);
        formData.append("countWeightType", `${device.countWeightType}`);
        formData.append("img", file);
        formData.append("typeId", type.id.toString());
        formData.append("fillingId", filling.id.toString());
        formData.append("discount", device.discount);
        formData.append("biscuitId", biscuit.id.toString());
        formData.append("info", JSON.stringify(device.info));
        await cakesApi.createCake(formData).then(() => {
          navigate(PrivateRoutesEnum.RECIPES);
        });
      }
    } catch (e: any) {
      toast.error(e.response.data.message);
    }
  };

  const EditDevice = async () => {
    try {
      if (file && type && filling && biscuit && params.id) {
        const formData = new FormData();
        formData.append("name", device.name);
        formData.append("price", `${device.price}`);
        formData.append("description", `${device.description}`);
        formData.append("weightType", `${device.weightType}`);
        formData.append("countWeightType", `${device.countWeightType}`);
        formData.append("img", file);
        formData.append("typeId", type.id.toString());
        formData.append("fillingId", filling.id.toString());
        formData.append("discount", device.discount);
        formData.append("biscuitId", biscuit.id.toString());
        formData.append(
          "info",
          JSON.stringify(
            device.info?.map((info: any) => {
              return {
                ...info,
                pricePerUnit: info.pricePerUnit.replace(",", "."),
                weight: info.weight.replace(",", "."),
              };
            }) || []
          )
        );
        await cakesApi.editCake(params.id.toString(), formData).then(() => {
          navigate(PrivateRoutesEnum.RECIPES);
        });
      }
    } catch (e: any) {
      toast.error(e.response.data.message);
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
    }
  );

  const { load: fetchBiscuits } = useRequest(cakesApi.getBiscuits, (data) => {
    if (data) {
      setBiscuits(data.data);
    }
  });

  const fetchDeviceInfo = async () => {
    if (params.id) {
      await cakesApi.loadRecipe(params.id).then((r) => {
        if (r) {
          setDevice({
            name: r.name,
            price: r.price,
            description: r.description,
            info: r.info || [],
            img: r.img,
            discount: r.discount,
            weightType: r.weightType,
            countWeightType: r.countWeightType,
          });
          setRenderImage(`${import.meta.env.VITE_API_URL_IMAGE}${r.img}`);
          if (types.length > 0) {
            setType(types.find((item) => item.id === r.TypeId) as TypeModel);
          }
          if (fillings.length > 0) {
            setFilling(
              fillings.find((item) => item.id === r.FillingId) as {
                id: number;
                name: string;
                img: string;
              }
            );
          }
          if (biscuits.length > 0) {
            setBiscuit(
              biscuits.find((item) => item.id === r.BiscuitId) as {
                id: number;
                name: string;
                img: string;
              }
            );
          }
        }
      });
    }
  };
  useEffect(() => {
    fetchTypes();
    fetchFillings();
    fetchBiscuits();
  }, []);

  useEffect(() => {
    if (params.id) {
      fetchDeviceInfo();
    }
  }, [params, types, fillings]);

  const onSaveDisabled = useMemo(() => {
    if (device && device.info && device.info.length > 0) {
      return device.info.some((item: any) => {
        return (
          item.name === "" ||
          item.weight === "" ||
          item.pricePerUnit === "" ||
          item.weightType === "" ||
          !item.name ||
          !item.weight ||
          !item.pricePerUnit ||
          !item.weightType
        );
      });
    } else return false;
  }, [device]);
  return (
    <MainWrapper>
      <Text size={"3xl"}>
        {!params.id ? "Создание нового рецепта" : "Редактирование рецепта"}
      </Text>
      <div className={styles.RecipeCreate}>
        <ComponentStyleWrapper>
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
                  <Text size={"l"}>
                    Выберите или перетащите фотографию десерта
                  </Text>
                  <Text size={"s"} view={"secondary"}>
                    Поддерживаются файлы форматов jpg,png,jpeg
                  </Text>
                  <Button onClick={openFileDialog} label="Выбрать файл" />
                </>
              )}
            </DragNDropField>
            {renderImage !== "" && (
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
                    size={"s"}
                    form={"round"}
                    label={"Десерт"}
                    placeholder={"Выберите тип десерта"}
                    items={types}
                    getItemLabel={(i) => i.name}
                    value={type}
                    onChange={(value) => setType(value.value)}
                  />
                )}
                {fillings.length > 0 && (
                  <Select
                    size={"s"}
                    form={"round"}
                    label={"Начинка"}
                    placeholder={"Выберите начинку"}
                    items={fillings}
                    getItemLabel={(i) => i.name}
                    value={filling}
                    onChange={(value) => setFilling(value.value)}
                  />
                )}
                {biscuits.length > 0 && (
                  <Select
                    size={"s"}
                    form={"round"}
                    label={"Бисквит"}
                    placeholder={"Выберите бисквит"}
                    items={biscuits}
                    getItemLabel={(i) => i.name}
                    value={biscuit}
                    onChange={(value) => setBiscuit(value.value)}
                  />
                )}
              </div>
            </div>
            <div className={styles.RecipeCreate__parameters}>
              <TextField
                size={"s"}
                form={"round"}
                label={"Стартовая единица измерения"}
                placeholder={"Введите стартовое кол-во"}
                value={device?.weightType}
                onChange={({ value }) => {
                  setDevice((prevState: any) => {
                    return { ...prevState, weightType: value };
                  });
                }}
              />
              <TextField
                size={"s"}
                form={"round"}
                type={"number"}
                label={"Стартовое кол-во для заказа"}
                placeholder={"Введите стартовое кол-во"}
                value={device?.countWeightType}
                onChange={({ value }) => {
                  setDevice((prevState: any) => {
                    return { ...prevState, countWeightType: value };
                  });
                }}
              />
              <TextField
                size={"s"}
                form={"round"}
                label={"Цена"}
                placeholder={"Введите цену"}
                type={"number"}
                value={device?.price}
                onChange={(value) => {
                  setDevice((prevState: any) => {
                    return { ...prevState, price: value.value };
                  });
                }}
              />
              <TextField
                size={"s"}
                form={"round"}
                min={0}
                max={100}
                label={"Скидка"}
                placeholder={"Введите скидку если есть"}
                type={"number"}
                value={device?.discount}
                onChange={({ value }) => {
                  if (value) {
                    if (Number(value) > 99) {
                      setDevice((prevState: any) => {
                        return { ...prevState, discount: "100" };
                      });
                    } else if (value.includes("-")) {
                      setDevice((prevState: any) => {
                        return { ...prevState, discount: "0" };
                      });
                    } else
                      setDevice((prevState: any) => {
                        return { ...prevState, discount: value };
                      });
                  } else
                    setDevice((prevState: any) => {
                      return { ...prevState, discount: "" };
                    });
                }}
              />
            </div>
            <TextField
              size={"s"}
              form={"round"}
              label={"Наименование"}
              placeholder={"Введите наименование"}
              value={device?.name}
              onChange={(value) => {
                setDevice((prevState: any) => {
                  return { ...prevState, name: value.value };
                });
              }}
            />

            <TextField
              size={"s"}
              label={"Описание"}
              type={"textarea"}
              rows={10}
              cols={70}
              placeholder={"Подробно опишите изделие"}
              form={"round"}
              value={device.description}
              onChange={(value) => {
                setDevice((prevState: any) => {
                  return { ...prevState, description: value.value };
                });
              }}
            />
          </div>
        </ComponentStyleWrapper>

        <ComponentStyleWrapper>
          <div className={styles.RecipeCreate__rightSide}>
            <div>
              <Text size={"3xl"}>Рецепт:</Text>
              <div className={styles.Recipe}>
                {device.info &&
                  device.info.length > 0 &&
                  device.info.map((rec: any, ind: number) => (
                    <div className={styles.Recipe__row} key={ind}>
                      <TextField
                        size={"s"}
                        form={"round"}
                        label={"Наименование"}
                        placeholder={"Введите наименование ингредиента"}
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
                        size={"s"}
                        form={"round"}
                        label={"Вес или количество"}
                        placeholder={"Введите вес и единицу измерения"}
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
                        size={"s"}
                        form={"round"}
                        label={"Единица измерения"}
                        placeholder={"Введите единицу измерения"}
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
                        size={"s"}
                        form={"round"}
                        label={"Цена за единицу"}
                        placeholder={"Введите цену за единицу ингредиента"}
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
                                (it: any, idx: number) => idx !== ind
                              ),
                            };
                          });
                        }}
                        className={styles.Recipe__row__button}
                        size={"s"}
                        iconLeft={IconTrash}
                      />
                    </div>
                  ))}
              </div>
              <Button
                className={styles.Recipe__addBtn}
                label={"Добавить строчку"}
                size={"xs"}
                onClick={() => {
                  setDevice((prev: any) => {
                    return {
                      ...prev,
                      info: [
                        ...prev.info,
                        {
                          id: null,
                          name: "",
                          weight: "",
                          weightType: "",
                          pricePerUnit: "",
                          device: {
                            id: params.id ? params.id : null,
                          },
                        },
                      ],
                    };
                  });
                }}
              />
            </div>
            <Button
              onClick={() => {
                if (!params.id) {
                  addDevice();
                } else EditDevice();
              }}
              className={
                onSaveDisabled ? styles.RecipeCreate__disabled : undefined
              }
              disabled={onSaveDisabled}
              label={!params.id ? "Создать" : "Сохранить"}
            />
          </div>
        </ComponentStyleWrapper>
      </div>
    </MainWrapper>
  );
};

export default AdministrationRecipesCreate;
