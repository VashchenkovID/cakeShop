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
    icon: <IconGeo className={styles.Footer__iconColor} />,
  },
  {
    label: "+7(919)-040-95-95",
    icon: <IconPhone className={styles.Footer__iconColor} />,
  },
  {
    label: "https://vk.com/alexa_cake_smol",
    icon: <IconVK className={styles.Footer__iconSize} />,
  },
  {
    label: "Телега",
    icon: <IconTelegram className={styles.Footer__iconSize} />,
  },
  {
    label: "+7(919)-040-95-95",
    icon: <IconWhatsApp className={styles.Footer__iconSize} />,
  },
  {
    label: "insta",
    icon: <IconInstagram className={styles.Footer__iconSize} />,
  },
];

const FooterWithInfo: React.FC = () => {
  return (
    <div className={styles.Footer}>
      {items.map((item, index) => (
        <div className={styles.Footer__row}>
          {item.icon}
          <Text style={{color:"#ffffff"}} size={"s"}>{item.label}</Text>
        </div>
      ))}
    </div>
  );
};

export default FooterWithInfo;
