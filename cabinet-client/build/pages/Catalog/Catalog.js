import React, { useEffect, useMemo, useState } from "react";
import useRequest from "../../hooks/useRequest";
import cakesApi from "../../api/requests/cakesApi";
import styles from "./Catalog.module.styl";
import cn from "classnames/bind";
import { useAppSelector } from "src/hooks/useAppSelector";
import { selectBasket } from "src/store/features/basket/BasketSelectors";
import { useNavigate } from "react-router-dom";
import IconBasket from "../../components/IconBasket/IconBasket";
import { PublicRoutesEnum } from "src/utils/enum";
import CatalogItem from "./CatalogItem/CatalogItem";
import { Tabs } from "@consta/uikit/Tabs";
import { Loader } from "@consta/uikit/Loader";
import InformerBadge from "../../components/Informer/Informer";
import { Pagination } from "@consta/uikit/Pagination";
import { Modal } from "@consta/uikit/Modal";
import CatalogBuyOneClickModal from "./CatalogBuyOneClickModal/CatalogBuyOneClickModal";
import { useResize } from "src/hooks/useResize";
const cx = cn.bind(styles);
const Catalog = () => {
    const { width } = useResize();
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
    const [modal, setModal] = useState(false);
    //pagination
    const handleChange = (pageNumber) => {
        if (pageNumber === 0) {
            setPagination((prevState) => {
                return { ...prevState, page: 1 };
            });
        }
        else {
            setPagination((prevState) => {
                return { ...prevState, page: pageNumber };
            });
        }
    };
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
    const totalPages = useMemo(() => {
        if (count > 10) {
            return Math.round(count / 10);
        }
        else
            return 1;
    }, [count]);
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
            React.createElement(Tabs, { size: "s", getItemLabel: (i) => i.name, items: types, value: type, onChange: ({ value }) => setType(value), fitMode: "scroll", view: "clear" })),
        items.length > 0 && (React.createElement("div", { className: styles.Shop__items }, items.map((item, index) => (React.createElement(CatalogItem, { setModal: setModal, item: item, key: `${item.id}_${index}`, width: width }))))),
        isLoading && (React.createElement("div", { className: styles.Shop__loader },
            React.createElement(Loader, null))),
        !isLoading && items.length === 0 && (React.createElement(InformerBadge, { text: "Список пуст" })),
        React.createElement("div", { className: cx(styles.IconBasket, {
                visible: isBasketVisible,
            }), onClick: () => navigate(`${PublicRoutesEnum.VIEW_ORDER}/${PublicRoutesEnum.CREATE_ORDER}`) },
            React.createElement(IconBasket, { className: styles.IconBasket__icon })),
        React.createElement("footer", null,
            React.createElement(Pagination, { className: styles.Shop__active, currentPage: pagination.page, onChange: handleChange, totalPages: totalPages })),
        React.createElement(Modal, { isOpen: modal },
            React.createElement(CatalogBuyOneClickModal, { modal: modal, setModal: setModal, width: width }))));
};
export default Catalog;
//# sourceMappingURL=Catalog.js.map