import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/hooks/useAppDispatch";
import { useAppSelector } from "src/hooks/useAppSelector";
import { selectBasket } from "src/store/features/basket/BasketSelectors";
import { PublicRoutesEnum } from "src/utils/enum";
import ordersApi from "../../../api/requests/ordersApi";
import { setBasket } from "src/store/features/basket/BasketSlice";
import styles from "./CatalogBuyOneClickModal.module.styl";
import { Text } from "@consta/uikit/Text";
import { Button } from "@consta/uikit/Button";
import { IconClose } from "@consta/uikit/IconClose";
import { DatePicker } from "@consta/uikit/DatePicker";
import { TextField } from "@consta/uikit/TextField";
import PhoneInput from "react-phone-input-2";
import cn from "classnames/bind";
import { storageUser } from "src/utils/storage";
const cx = cn.bind(styles);
const CatalogBuyOneClickModal = ({ modal, setModal, width, }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const basket = useAppSelector(selectBasket);
    const user = storageUser();
    const [notAuthUser, setNotAuthUser] = useState({
        name: "",
        phone: "",
        email: "",
        order_date: null,
    });
    const minOrderDate = useMemo(() => {
        const date = new Date();
        date.setDate(new Date().getDate() + 3);
        return new Date(date);
    }, []);
    const createNewIndividualOrder = async () => {
        await ordersApi
            .createNewIndividualOrder({
            name: `Индивидуальный заказ ${notAuthUser.name}`,
            customer: {
                fullName: notAuthUser.name,
                phone: notAuthUser.phone,
                email: notAuthUser.email,
            },
            date_completed: notAuthUser.order_date
                ? notAuthUser.order_date.toISOString()
                : undefined,
            items: basket
                ? basket.items.map((item) => {
                    return {
                        ...item,
                        price: item.price * item.countWeightType,
                        decors: item.decors.length > 0 && item.decors[0].items.length > 0
                            ? item.decors
                            : undefined,
                    };
                })
                : [],
        })
            .then(() => {
            setNotAuthUser({
                name: "",
                phone: "",
                email: "",
                order_date: null,
            });
            navigate(`${PublicRoutesEnum.SHOP}`);
            dispatch(setBasket(null));
            onClose();
        });
    };
    const createNewBasketOrder = async () => {
        if (user.id && basket && notAuthUser.order_date) {
            await ordersApi
                .createNewUserOrder({
                name: `Заказ пользователя ${user.name}`,
                date_completed: notAuthUser.order_date.toISOString(),
                items: basket.items.map((item) => {
                    return {
                        ...item,
                        price: item.price * item.countWeightType,
                        decors: item.decors.length > 0 && item.decors[0].items.length > 0
                            ? item.decors
                            : undefined,
                    };
                }),
                user_id: user.id,
            })
                .then(() => {
                setNotAuthUser({
                    name: "",
                    phone: "",
                    email: "",
                    order_date: null,
                });
                navigate(`${PublicRoutesEnum.SHOP}`);
                dispatch(setBasket(null));
                onClose();
            });
        }
    };
    const onClose = () => {
        dispatch(setBasket(null));
        setModal(false);
    };
    return (React.createElement("div", null, user ? (React.createElement("div", { className: styles.UserModal },
        React.createElement("div", { className: styles.modalHeader },
            React.createElement(Text, { size: width <= 500 ? "m" : "2xl" }, "\u041E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u0435 \u0437\u0430\u043A\u0430\u0437\u0430"),
            React.createElement(Button, { view: "clear", iconLeft: IconClose, onClick: onClose, size: "s" })),
        React.createElement(DatePicker, { size: width <= 500 ? "xs" : "s", label: "Дата выдачи заказа", value: notAuthUser.order_date, minDate: minOrderDate, onChange: ({ value }) => setNotAuthUser((prevState) => {
                return { ...prevState, order_date: value };
            }) }),
        React.createElement(Button, { size: width <= 500 ? "xs" : "s", label: "Оформить", onClick: createNewBasketOrder, disabled: !notAuthUser.order_date }))) : (React.createElement("div", { className: styles.NotUserModal },
        React.createElement("div", { className: styles.modalHeader },
            React.createElement(Text, { size: width <= 500 ? "m" : "2xl" }, "\u041E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u0435 \u0437\u0430\u043A\u0430\u0437\u0430"),
            React.createElement(Button, { view: "clear", iconLeft: IconClose, onClick: onClose, size: "s" })),
        React.createElement(TextField, { size: width <= 500 ? "xs" : "s", label: "Имя", placeholder: "Введите имя", value: notAuthUser.name, onChange: ({ value }) => setNotAuthUser((prevState) => {
                return { ...prevState, name: value || "" };
            }) }),
        React.createElement(PhoneInput, { specialLabel: "Номер телефона", containerClass: styles.NotUserModal__phoneContainer, inputClass: cx(styles.NotUserModal__phoneInput), placeholder: "Введите номер телефона", country: "ru", value: notAuthUser.phone, onChange: (value) => setNotAuthUser((prevState) => {
                return {
                    ...prevState,
                    phone: value
                        .split("")
                        .map((elem, index) => (index === 0 ? "7" : elem))
                        .join(""),
                };
            }) }),
        React.createElement(TextField, { size: width <= 500 ? "xs" : "s", label: "Почта", placeholder: "Введите почтовый адрес", value: notAuthUser.email, onChange: ({ value }) => setNotAuthUser((prevState) => {
                return { ...prevState, email: value || "" };
            }) }),
        React.createElement(DatePicker, { size: width <= 500 ? "xs" : "s", label: "Дата выдачи", placeholder: "Выберите дату выдачи заказа", value: notAuthUser.order_date, minDate: minOrderDate, onChange: ({ value }) => setNotAuthUser((prevState) => {
                return { ...prevState, order_date: value };
            }) }),
        React.createElement(Button, { className: styles.btn, size: width <= 500 ? "xs" : "s", label: "Оформить", onClick: createNewIndividualOrder, view: notAuthUser.name === "" ||
                notAuthUser.phone === "" ||
                !notAuthUser.order_date
                ? "ghost"
                : "primary", disabled: notAuthUser.name === "" ||
                notAuthUser.phone === "" ||
                !notAuthUser.order_date })))));
};
export default CatalogBuyOneClickModal;
//# sourceMappingURL=CatalogBuyOneClickModal.js.map