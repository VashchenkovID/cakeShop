import React, { useEffect, useMemo, useState } from "react";
import cakesApi from "../../../api/requests/cakesApi";
import styles from "./AdministrationRecipesCreate.module.styl";
import cn from "classnames/bind";
import { useNavigate } from "react-router-dom";
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
const cx = cn.bind(styles);
const AdministrationRecipesCreate = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [types, setTypes] = useState([]);
    const [fillings, setFillings] = useState([]);
    const [biscuits, setBiscuits] = useState([]);
    const [device, setDevice] = useState({
        name: "",
        price: 0,
        description: "",
        info: [],
        img: "",
        discount: 0,
        weightType: "",
        countWeightType: 0,
    });
    const [type, setType] = useState(null);
    const [filling, setFilling] = useState(null);
    const [biscuit, setBiscuit] = useState(null);
    const [file, setFile] = useState(null);
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
                    navigate("/recipes" /* PrivateRoutesEnum.RECIPES */);
                });
            }
        }
        catch (e) {
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
                formData.append("info", JSON.stringify(device.info?.map((info) => {
                    return {
                        ...info,
                        pricePerUnit: info.pricePerUnit.replace(",", "."),
                        weight: info.weight.replace(",", "."),
                    };
                }) || []));
                await cakesApi.editCake(params.id.toString(), formData).then(() => {
                    navigate("/recipes" /* PrivateRoutesEnum.RECIPES */);
                });
            }
        }
        catch (e) {
            toast.error(e.response.data.message);
        }
    };
    const { load: fetchTypes } = useRequest(cakesApi.getCakeTypes, (data) => {
        if (data) {
            setTypes(data.data);
        }
    });
    const { load: fetchFillings } = useRequest(cakesApi.getCakeFillings, (data) => {
        if (data) {
            setFillings(data.data);
        }
    });
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
                        setType(types.find((item) => item.id === r.TypeId));
                    }
                    if (fillings.length > 0) {
                        setFilling(fillings.find((item) => item.id === r.FillingId));
                    }
                    if (biscuits.length > 0) {
                        setBiscuit(biscuits.find((item) => item.id === r.BiscuitId));
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
            return device.info.some((item) => {
                return (item.name === "" ||
                    item.weight === "" ||
                    item.pricePerUnit === "" ||
                    item.weightType === "" ||
                    !item.name ||
                    !item.weight ||
                    !item.pricePerUnit ||
                    !item.weightType);
            });
        }
        else
            return false;
    }, [device]);
    return (React.createElement(MainWrapper, null,
        React.createElement(Text, { size: "3xl" }, !params.id ? "Создание нового рецепта" : "Редактирование рецепта"),
        React.createElement("div", { className: styles.RecipeCreate },
            React.createElement(ComponentStyleWrapper, null,
                React.createElement("div", { className: styles.RecipeCreate__leftSide },
                    React.createElement(DragNDropField, { multiple: false, onDropFiles: (file) => {
                            setFile(file[0]);
                            const src = URL.createObjectURL(file[0]);
                            setRenderImage(src.slice(5));
                        } }, ({ openFileDialog }) => (React.createElement(React.Fragment, null,
                        React.createElement(Text, { size: "l" }, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0438\u043B\u0438 \u043F\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435 \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u044E \u0434\u0435\u0441\u0435\u0440\u0442\u0430"),
                        React.createElement(Text, { size: "s", view: "secondary" }, "\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u044E\u0442\u0441\u044F \u0444\u0430\u0439\u043B\u044B \u0444\u043E\u0440\u043C\u0430\u0442\u043E\u0432 jpg,png,jpeg"),
                        React.createElement(Button, { onClick: openFileDialog, label: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0444\u0430\u0439\u043B" })))),
                    renderImage !== "" && (React.createElement("img", { className: styles.RecipeCreate__image, src: renderImage, alt: "\u041E\u0448\u0438\u0431\u043A\u0430" })),
                    React.createElement("div", { className: styles.Recipe__compound },
                        React.createElement(Text, null, "\u0421\u043E\u0441\u0442\u0430\u0432:"),
                        React.createElement("div", { className: styles.RecipeCreate__compound__selects },
                            types.length > 0 && (React.createElement(Select, { size: "s", form: "round", label: "Десерт", placeholder: "Выберите тип десерта", items: types, getItemLabel: (i) => i.name, value: type, onChange: (value) => setType(value.value) })),
                            fillings.length > 0 && (React.createElement(Select, { size: "s", form: "round", label: "Начинка", placeholder: "Выберите начинку", items: fillings, getItemLabel: (i) => i.name, value: filling, onChange: (value) => setFilling(value.value) })),
                            biscuits.length > 0 && (React.createElement(Select, { size: "s", form: "round", label: "Бисквит", placeholder: "Выберите бисквит", items: biscuits, getItemLabel: (i) => i.name, value: biscuit, onChange: (value) => setBiscuit(value.value) })))),
                    React.createElement("div", { className: styles.RecipeCreate__parameters },
                        React.createElement(TextField, { size: "s", form: "round", label: "Стартовая единица измерения", placeholder: "Введите стартовое кол-во", value: device?.weightType, onChange: ({ value }) => {
                                setDevice((prevState) => {
                                    return { ...prevState, weightType: value };
                                });
                            } }),
                        React.createElement(TextField, { size: "s", form: "round", type: "number", label: "Стартовое кол-во для заказа", placeholder: "Введите стартовое кол-во", value: device?.countWeightType, onChange: ({ value }) => {
                                setDevice((prevState) => {
                                    return { ...prevState, countWeightType: value };
                                });
                            } }),
                        React.createElement(TextField, { size: "s", form: "round", label: "Цена", placeholder: "Введите цену", type: "number", value: device?.price, onChange: (value) => {
                                setDevice((prevState) => {
                                    return { ...prevState, price: value.value };
                                });
                            } }),
                        React.createElement(TextField, { size: "s", form: "round", min: 0, max: 100, label: "Скидка", placeholder: "Введите скидку если есть", type: "number", value: device?.discount, onChange: ({ value }) => {
                                if (value) {
                                    if (Number(value) > 99) {
                                        setDevice((prevState) => {
                                            return { ...prevState, discount: "100" };
                                        });
                                    }
                                    else if (value.includes("-")) {
                                        setDevice((prevState) => {
                                            return { ...prevState, discount: "0" };
                                        });
                                    }
                                    else
                                        setDevice((prevState) => {
                                            return { ...prevState, discount: value };
                                        });
                                }
                                else
                                    setDevice((prevState) => {
                                        return { ...prevState, discount: "" };
                                    });
                            } })),
                    React.createElement(TextField, { size: "s", form: "round", label: "Наименование", placeholder: "Введите наименование", value: device?.name, onChange: (value) => {
                            setDevice((prevState) => {
                                return { ...prevState, name: value.value };
                            });
                        } }),
                    React.createElement(TextField, { size: "s", label: "Описание", type: "textarea", rows: 10, cols: 70, placeholder: "Подробно опишите изделие", form: "round", value: device.description, onChange: (value) => {
                            setDevice((prevState) => {
                                return { ...prevState, description: value.value };
                            });
                        } }))),
            React.createElement(ComponentStyleWrapper, null,
                React.createElement("div", { className: styles.RecipeCreate__rightSide },
                    React.createElement("div", null,
                        React.createElement(Text, { size: "3xl" }, "\u0420\u0435\u0446\u0435\u043F\u0442:"),
                        React.createElement("div", { className: styles.Recipe }, device.info &&
                            device.info.length > 0 &&
                            device.info.map((rec, ind) => (React.createElement("div", { className: styles.Recipe__row, key: ind },
                                React.createElement(TextField, { size: "s", form: "round", label: "Наименование", placeholder: "Введите наименование ингредиента", value: rec.name, onChange: (value) => {
                                        setDevice((prev) => {
                                            return {
                                                ...prev,
                                                info: prev.info.map((itm, idx) => {
                                                    if (idx === ind) {
                                                        return { ...itm, name: value.value };
                                                    }
                                                    else
                                                        return { ...itm };
                                                }),
                                            };
                                        });
                                    } }),
                                React.createElement(TextField, { size: "s", form: "round", label: "Вес или количество", placeholder: "Введите вес и единицу измерения", value: rec.weight, onChange: (value) => {
                                        setDevice((prev) => {
                                            return {
                                                ...prev,
                                                info: prev.info.map((itm, idx) => {
                                                    if (idx === ind) {
                                                        return { ...itm, weight: value.value };
                                                    }
                                                    else
                                                        return { ...itm };
                                                }),
                                            };
                                        });
                                    } }),
                                React.createElement(TextField, { size: "s", form: "round", label: "Единица измерения", placeholder: "Введите единицу измерения", value: rec.weightType, onChange: (value) => {
                                        setDevice((prev) => {
                                            return {
                                                ...prev,
                                                info: prev.info.map((itm, idx) => {
                                                    if (idx === ind) {
                                                        return { ...itm, weightType: value.value };
                                                    }
                                                    else
                                                        return { ...itm };
                                                }),
                                            };
                                        });
                                    } }),
                                React.createElement(TextField, { size: "s", form: "round", label: "Цена за единицу", placeholder: "Введите цену за единицу ингредиента", value: rec.pricePerUnit, onChange: (value) => {
                                        setDevice((prev) => {
                                            return {
                                                ...prev,
                                                info: prev.info.map((itm, idx) => {
                                                    if (idx === ind) {
                                                        return { ...itm, pricePerUnit: value.value };
                                                    }
                                                    else
                                                        return { ...itm };
                                                }),
                                            };
                                        });
                                    } }),
                                React.createElement(Button, { onClick: () => {
                                        setDevice((prev) => {
                                            return {
                                                ...prev,
                                                info: prev.info.filter((it, idx) => idx !== ind),
                                            };
                                        });
                                    }, className: styles.Recipe__row__button, size: "s", iconLeft: IconTrash }))))),
                        React.createElement(Button, { className: styles.Recipe__addBtn, label: "Добавить строчку", size: "xs", onClick: () => {
                                setDevice((prev) => {
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
                            } })),
                    React.createElement(Button, { onClick: () => {
                            if (!params.id) {
                                addDevice();
                            }
                            else
                                EditDevice();
                        }, className: onSaveDisabled ? styles.RecipeCreate__disabled : undefined, disabled: onSaveDisabled, label: !params.id ? "Создать" : "Сохранить" }))))));
};
export default AdministrationRecipesCreate;
//# sourceMappingURL=AdministrationRecipesCreate.js.map