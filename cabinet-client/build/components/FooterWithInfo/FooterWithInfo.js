import React from "react";
import { IconGeo } from "@consta/uikit/IconGeo";
import { Text } from "@consta/uikit/Text";
import { IconPhone } from "@consta/uikit/IconPhone";
import IconTelegram from "../Icons/IconTelegram";
import IconInstagram from "../Icons/IconInstagram";
import IconWhatsApp from "../Icons/IconWhatsApp";
import styles from "./FooterWithInfo.module.styl";
import IconVK from "../Icons/IconVK";
const items = [
    {
        label: "Смоленск",
        icon: React.createElement(IconGeo, { className: styles.Footer__iconColor }),
    },
    {
        label: "+7(919)-040-95-95",
        icon: React.createElement(IconPhone, { className: styles.Footer__iconColor }),
    },
    {
        label: "https://vk.com/alexa_cake_smol",
        icon: React.createElement(IconVK, { className: styles.Footer__iconSize }),
    },
    {
        label: "Телега",
        icon: React.createElement(IconTelegram, { className: styles.Footer__iconSize }),
    },
    {
        label: "+7(919)-040-95-95",
        icon: React.createElement(IconWhatsApp, { className: styles.Footer__iconSize }),
    },
    {
        label: "insta",
        icon: React.createElement(IconInstagram, { className: styles.Footer__iconSize }),
    },
];
const FooterWithInfo = () => {
    return (React.createElement("div", { className: styles.Footer }, items.map((item, index) => (React.createElement("div", { className: styles.Footer__row },
        item.icon,
        React.createElement(Text, { size: "s" }, item.label))))));
};
export default FooterWithInfo;
//# sourceMappingURL=FooterWithInfo.js.map