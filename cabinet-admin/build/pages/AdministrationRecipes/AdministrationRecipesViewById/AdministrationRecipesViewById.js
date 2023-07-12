import React, { useEffect, useState } from "react";
import useRequest from "src/hooks/useRequest";
import cakesApi from "src/api/requests/cakesApi";
import styles from "./AdministrationRecipesViewById.module.styl";
import { useAppDispatch } from "src/hooks/useAppDispatch";
import { setCake } from "src/redux/features/cake/CakeSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "@consta/uikit/Button";
import { Text } from "@consta/uikit/Text";
import IconColorStar from "src/components/IconStar/IconColorStar";
import InformerBadge from "src/components/Informer/Informer";
const AdministrationRecipesViewById = ({ activeList, }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [device, setDevice] = useState(null);
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
    return (React.createElement(React.Fragment, null,
        device && (React.createElement("div", null,
            React.createElement("div", { className: styles.FullRecipe },
                React.createElement("div", { className: styles.FullRecipe__leftSide },
                    React.createElement("div", { className: styles.FullRecipe__leftSide__title },
                        React.createElement("img", { className: styles.FullRecipe__leftSide__img, src: `${import.meta.env.VITE_API_URL_IMAGE}${device.img}` }),
                        React.createElement("div", { className: styles.FullRecipe__leftSide__deviceDescription },
                            React.createElement(Text, { size: "4xl" }, device.name),
                            React.createElement(Text, null,
                                "\u0421\u043E\u0437\u0434\u0430\u043D:",
                                new Date(device.createdAt).toLocaleDateString()),
                            React.createElement(Text, { weight: "semibold", size: "l" }, `Продажа от: ${device.countWeightType} ${device.weightType}`),
                            device.rating && (React.createElement(Text, { className: styles.rating, weight: "semibold", size: "l" },
                                "\u0420\u0435\u0439\u0442\u0438\u043D\u0433: ",
                                device.rating?.toFixed(2),
                                " ",
                                React.createElement(IconColorStar, null))),
                            React.createElement(Text, { weight: "semibold", size: "l" },
                                "\u0426\u0435\u043D\u0430: ",
                                device.price,
                                " \u20BD"))),
                    React.createElement(Text, { view: "secondary" }, device.description)),
                React.createElement("div", { className: styles.FullRecipe__rightSide },
                    React.createElement(Text, { size: "3xl" }, "\u0420\u0435\u0446\u0435\u043F\u0442 \u043D\u0430 1 \u0435\u0434\u0438\u043D\u0438\u0446\u0443"),
                    React.createElement("div", { className: styles.FullRecipe__rightSide__header },
                        React.createElement(Text, { weight: "semibold", className: styles.FullRecipe__rightSide__list__row__col }, "\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435"),
                        React.createElement(Text, { weight: "semibold", className: styles.FullRecipe__rightSide__list__row__col }, "\u041A\u043E\u043B-\u0432\u043E"),
                        React.createElement(Text, { weight: "semibold", className: styles.FullRecipe__rightSide__list__row__col }, "\u0415\u0434\u0438\u043D\u0438\u0446\u0430 \u0438\u0437\u043C\u0435\u0440\u0435\u043D\u0438\u044F"),
                        React.createElement(Text, { weight: "semibold", className: styles.FullRecipe__rightSide__list__row__col }, "\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0437\u0430 \u0435\u0434\u0438\u043D\u0438\u0446\u0443"),
                        React.createElement(Text, { weight: "semibold", className: styles.FullRecipe__rightSide__list__row__col }, "\u041E\u0431\u0449\u0430\u044F \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C")),
                    React.createElement("div", { className: styles.FullRecipe__rightSide__list }, device.info &&
                        device.info.length > 0 &&
                        device.info.map((item, index) => (React.createElement("div", { key: index, className: styles.FullRecipe__rightSide__list__row },
                            React.createElement(Text, { className: styles.FullRecipe__rightSide__list__row__col, weight: "semibold" }, item.name),
                            React.createElement(Text, { weight: "semibold", className: styles.FullRecipe__rightSide__list__row__col }, item.weight),
                            React.createElement(Text, { weight: "semibold", className: styles.FullRecipe__rightSide__list__row__col }, item.weightType),
                            React.createElement(Text, { weight: "semibold", className: styles.FullRecipe__rightSide__list__row__col },
                                item.pricePerUnit,
                                " \u20BD"),
                            React.createElement(Text, { weight: "semibold", className: styles.FullRecipe__rightSide__list__row__col },
                                (item.pricePerUnit * Number(item.weight)).toFixed(2),
                                " \u20BD"))))),
                    React.createElement(Text, { className: styles.FullRecipe__summing, weight: "semibold", size: "l" },
                        "\u0418\u0442\u043E\u0433\u043E:",
                        device.info?.reduce((accum, item) => {
                            return (accum + Number(item.pricePerUnit) * Number(item.weight));
                        }, 0),
                        "\u20BD"))),
            React.createElement("div", { className: styles.Footer },
                React.createElement(Button, { onClick: () => {
                        navigate(`${"/edit-cake" /* PrivateRoutesEnum.EDIT_CAKE */}/${device.id}`);
                    }, label: "Редактировать" }),
                React.createElement(Button, { onClick: () => removeCake(), label: "Удалить" })))),
        React.createElement("div", null, !activeList && (React.createElement(InformerBadge, { text: "Выберите рецепт из меню слева" })))));
};
export default AdministrationRecipesViewById;
//# sourceMappingURL=AdministrationRecipesViewById.js.map