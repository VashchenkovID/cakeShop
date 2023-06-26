import React, { useEffect, useMemo, useState } from "react";
import useRequest from "../../hooks/useRequest";
import cakesApi from "../../api/requests/cakesApi";
import styles from "./Catalog.module.styl";
import cn from "classnames/bind";
import PaginationCustom from "../../components/PaginationCustom/PaginationCustom";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectBasket } from "../../store/features/basket/BasketSelectors";
import { useNavigate } from "react-router-dom";
import IconBasket from "../../components/IconBasket/IconBasket";
import { PublicRoutesEnum } from "../../utils/enum";
import CatalogItem from "./CatalogItem/CatalogItem";
import { Tabs } from "@consta/uikit/Tabs";
import { Loader } from "@consta/uikit/Loader";
import InformerBadge from "../../components/Informer/Informer";
const cx = cn.bind(styles);
const Catalog = () => {
    const basket = useAppSelector(selectBasket);
    const navigate = useNavigate();
    const [type, setType] = useState({
        id: undefined,
        name: "Все",
        createdAt: "",
        updatedAt: "",
    });
    const [types, setTypes] = useState([
        {
            id: undefined,
            name: "Все",
            createdAt: "",
            updatedAt: "",
        },
    ]);
    const [items, setItems] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        perPage: 10,
    });
    const [count, setCount] = useState(0);
    const { load: fetchTypes, isLoading: typeLoading } = useRequest(cakesApi.getCakeTypes, (data) => {
        if (data) {
            setTypes((prev) => {
                return [
                    {
                        id: undefined,
                        name: "Все",
                        createdAt: "",
                        updatedAt: "",
                    },
                    ...data.data,
                ];
            });
        }
    });
    const { load: fetchRecipes, isLoading } = useRequest(cakesApi.loadAllCakes, (data) => {
        if (data) {
            setItems(data.data.rows);
            setCount(data.data.count);
        }
    });
    const isBasketVisible = useMemo(() => {
        return basket && basket.items.length > 0;
    }, [basket]);
    useEffect(() => {
        fetchTypes();
    }, []);
    useEffect(() => {
        if (type) {
            fetchRecipes({
                typeId: type.id,
                page: pagination.page,
                limit: pagination.perPage,
            });
        }
        else {
            fetchRecipes({
                typeId: undefined,
                page: pagination.page,
                limit: pagination.perPage,
            });
        }
    }, [pagination, type]);
    return (React.createElement("div", { className: styles.Shop },
        React.createElement("div", { className: styles.Shop__header },
            React.createElement(Tabs, { getItemLabel: (i) => i.name, items: types, value: type, onChange: ({ value }) => setType(value), fitMode: "scroll", view: "clear" })),
        !isLoading ? (React.createElement("div", { className: styles.Shop__items }, items.length > 0 ? (items.map((item, index) => (React.createElement(CatalogItem, { item: item, key: `${item.id}_${index}` })))) : (React.createElement(InformerBadge, { text: "Список пуст" })))) : (React.createElement("div", { className: styles.Shop__loader },
            React.createElement(Loader, null))),
        React.createElement("div", { className: cx(styles.IconBasket, {
                visible: isBasketVisible,
            }), onClick: () => navigate(`${PublicRoutesEnum.VIEW_ORDER}`) },
            React.createElement(IconBasket, { className: styles.IconBasket__icon })),
        React.createElement("footer", { className: styles.Shop__active },
            React.createElement(PaginationCustom, { total: count, pagination: pagination, setPagination: setPagination }))));
};
export default Catalog;
//# sourceMappingURL=Catalog.js.map