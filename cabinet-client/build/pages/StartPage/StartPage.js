import React, { useEffect, useState } from "react";
import styles from "./StartPage.module.styl";
import useRequest from "../../hooks/useRequest";
import cakesApi from "../../api/requests/cakesApi";
import Carousel, { arrowsPlugin } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { Button } from "@consta/uikit/Button";
import { IconArrowLeft } from "@consta/uikit/IconArrowLeft";
import { IconArrowRight } from "@consta/uikit/IconArrowRight";
import { Text } from "@consta/uikit/Text";
import ComponentStyleWrapper from "../../components/ComponentStyleWrapper/ComponentStyleWrapper";
import { useResize } from "../../hooks/useResize";
import CatalogItem from "../Catalog/CatalogItem/CatalogItem";
import { useNavigate } from "react-router-dom";
import { PublicRoutesEnum } from "../../utils/enum";
import { Modal } from "@consta/uikit/Modal";
import CatalogBuyOneClickModal from "../Catalog/CatalogBuyOneClickModal/CatalogBuyOneClickModal";
import { IconPhone } from "@consta/uikit/IconPhone";
import IconVK from "../../components/Icons/IconVK";
import IconTelegram from "../../components/Icons/IconTelegram";
import IconWhatsApp from "../../components/Icons/IconWhatsApp";
import IconInstagram from "../../components/Icons/IconInstagram";
import { IconClose } from "@consta/uikit/IconClose";
const communicationItems = [
    {
        href: undefined,
        label: "+7(919)-040-95-95",
        icon: React.createElement(IconPhone, { className: styles.Communication__iconColor }),
    },
    {
        href: "https://vk.com/alexa_cake_smol",
        label: "https://vk.com/alexa_cake_smol",
        icon: React.createElement(IconVK, { className: styles.Communication__iconSize }),
    },
    {
        href: "https://t.me/",
        label: "https://t.me/",
        icon: React.createElement(IconTelegram, { className: styles.Communication__iconSize }),
    },
    {
        href: "https://wa.me/79190409595",
        label: "+7(919)-040-95-95",
        icon: React.createElement(IconWhatsApp, { className: styles.Communication__iconSize }),
    },
    {
        label: "insta",
        icon: React.createElement(IconInstagram, { className: styles.Communication__iconSize }),
    },
];
const StartPage = () => {
    const navigate = useNavigate();
    const { width } = useResize();
    const [items, setItems] = useState(null);
    const { load: fetchStart } = useRequest(cakesApi.getStart, (data) => {
        setItems(data?.data || []);
    });
    const [modal, setModal] = useState(false);
    useEffect(() => {
        fetchStart();
    }, []);
    const [individualModal, setIndividualModal] = useState(false);
    return (React.createElement("section", { className: styles.container },
        React.createElement(ComponentStyleWrapper, null,
            React.createElement(Carousel, { plugins: [
                    {
                        resolve: arrowsPlugin,
                        options: {
                            arrowLeft: React.createElement(Button, { iconLeft: IconArrowLeft, view: "clear" }),
                            arrowLeftDisabled: (React.createElement(Button, { iconLeft: IconArrowLeft, view: "clear" })),
                            arrowRight: React.createElement(Button, { iconLeft: IconArrowRight, view: "clear" }),
                            arrowRightDisabled: (React.createElement(Button, { iconLeft: IconArrowRight, view: "clear" })),
                            addArrowClickHandler: true,
                        },
                    },
                ] },
                React.createElement("div", { className: styles.container__slide },
                    React.createElement(Text, { align: "center", size: width >= 800 ? "5xl" : "3xl" }, "Kassandra's Cake"),
                    React.createElement(Text, { size: width >= 800 ? "m" : "s", align: "center" }, "\u041C\u0430\u0433\u0430\u0437\u0438\u043D \u043A\u043E\u043D\u0434\u0438\u0442\u0435\u0440\u0441\u043A\u0438\u0445 \u0438\u0437\u0434\u0435\u043B\u0438\u0439"),
                    React.createElement("div", { className: styles.container__slide__actions },
                        React.createElement(Button, { label: "Выбрать десерт", size: "s", onClick: () => navigate(`${PublicRoutesEnum.SHOP}`) }),
                        React.createElement(Button, { label: "Сделать индивидуальный заказ", size: "s", onClick: () => setIndividualModal(true) }))),
                React.createElement("div", { className: styles.container__slide },
                    React.createElement(Text, null,
                        React.createElement(Text, null, "\u041F\u0440\u0438\u0432\u0435\u0442!"),
                        React.createElement(Text, null, "\u041C\u0435\u043D\u044F \u0437\u043E\u0432\u0443\u0442 \u0410\u043B\u0435\u043A\u0441\u0430\u043D\u0434\u0440\u0430 \u0438 \u044F \u0434\u043E\u043C\u0430\u0448\u043D\u0438\u0439 \u043A\u043E\u043D\u0434\u0438\u0442\u0435\u0440 \u0441 \u043E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435\u043C \u00AB\u0418\u043D\u0436\u0435\u043D\u0435\u0440-\u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433 \u043F\u0438\u0449\u0435\u0432\u043E\u0439 \u043F\u0440\u043E\u043C\u044B\u0448\u043B\u0435\u043D\u043D\u043E\u0441\u0442\u0438\u00BB\uD83D\uDC69\uD83C\uDFFC\u200D\uD83C\uDF73\uD83E\uDDD1\uD83C\uDFFC\u200D\uD83D\uDD27"),
                        React.createElement(Text, null, "\u0416\u0438\u0432\u0443 \u0438 \u0440\u0430\u0431\u043E\u0442\u0430\u044E \u0432 \u0421\u043C\u043E\u043B\u0435\u043D\u0441\u043A\u0435 \uD83C\uDFD9 \u0413\u043E\u0442\u043E\u0432\u043B\u044E \u0442\u043E\u0440\u0442\u044B, \u043A\u0430\u043F\u043A\u0435\u0439\u043A\u0438 \u0438 \u0434\u0440\u0443\u0433\u0438\u0435 \u0434\u0435\u0441\u0435\u0440\u0442\u044B \u043D\u0430 \u0437\u0430\u043A\u0430\u0437 \uD83C\uDF70\uD83E\uDDC1 \u0421\u043E\u0437\u0434\u0430\u044E \u043D\u0435\u0432\u0435\u0440\u043E\u044F\u0442\u043D\u044B\u0439 \u0448\u043E\u043A\u043E\u043B\u0430\u0434 \u0438 \u043A\u043E\u043D\u0444\u0435\u0442\u044B \uD83C\uDF6B\uD83C\uDF6D"))))),
        React.createElement("div", { className: styles.container__deviceSection },
            React.createElement(Text, { className: styles.container__deviceSection__line, size: "3xl" }, "\u041F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u044B\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438"),
            React.createElement("div", { className: styles.container__deviceSection__types }, items &&
                items.types.length > 0 &&
                items.types.map((type) => (React.createElement(ComponentStyleWrapper, { key: type.id },
                    React.createElement(Text, { cursor: "pointer", align: "center" }, type.name)))))),
        React.createElement("div", { className: styles.container__deviceSection },
            React.createElement(Text, { className: styles.container__deviceSection__line, size: "3xl" }, "\u041F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u044B\u0435 \u0434\u0435\u0441\u0435\u0440\u0442\u044B"),
            items &&
                Object.keys(items.items).map((key) => (React.createElement("div", { className: styles.container__deviceSection__underSection },
                    React.createElement(Text, { size: "2xl" }, key),
                    React.createElement("div", { className: styles.container__deviceSection__items }, items.items[key] &&
                        items.items[key].map((item) => (React.createElement(CatalogItem, { setModal: setModal, width: width, item: item, key: `${item.id}` })))))))),
        React.createElement(Modal, { isOpen: modal },
            React.createElement(CatalogBuyOneClickModal, { modal: modal, setModal: setModal, width: width })),
        React.createElement(Modal, { isOpen: individualModal },
            React.createElement("div", { className: styles.Communication },
                React.createElement("div", { className: styles.Communication__header },
                    React.createElement(Text, { size: "2xl" }, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0440\u0435\u0434\u043F\u043E\u0447\u0438\u0442\u0430\u0435\u043C\u044B\u0439 \u0441\u043F\u043E\u0441\u043E\u0431 \u0441\u0432\u044F\u0437\u0438"),
                    React.createElement(Button, { view: "clear", iconLeft: IconClose, onClick: () => setIndividualModal(false) })),
                React.createElement("div", { className: styles.Communication__rows }, communicationItems.map((item) => (React.createElement("a", { className: styles.Communication__row, href: item.href, target: "_blank" },
                    item.icon,
                    React.createElement(Text, { size: "s" }, item.label)))))))));
};
export default React.memo(StartPage);
//# sourceMappingURL=StartPage.js.map