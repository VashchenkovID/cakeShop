import React, { useMemo } from "react";
import styles from "./BasketWithCount.module.styl";
import { useNavigate } from "react-router-dom";
import { IconStorage } from "@consta/uikit/IconStorage";
import { useAppSelector } from "src/hooks/useAppSelector";
import { selectBasket } from "src/store/features/basket/BasketSelectors";
import { PublicRoutesEnum } from "src/utils/enum";
const BasketWithCount = ({ setIsOpen }) => {
    const basket = useAppSelector(selectBasket);
    const navigate = useNavigate();
    const countInOrder = useMemo(() => {
        if (basket) {
            return basket.items.reduce((accum, item) => accum + item.count, 0);
        }
        else
            return null;
    }, [basket]);
    return (React.createElement("div", { onClick: () => {
            if (setIsOpen) {
                setIsOpen(false);
            }
            navigate(`${PublicRoutesEnum.VIEW_ORDER}/${PublicRoutesEnum.CREATE_ORDER}`);
        }, className: styles.Container },
        React.createElement(IconStorage, { className: styles.icon, view: "ghost" }),
        countInOrder ? (React.createElement("div", { className: styles.Container__cnt }, countInOrder)) : (React.createElement("div", null))));
};
export default BasketWithCount;
//# sourceMappingURL=BasketWithCount.js.map