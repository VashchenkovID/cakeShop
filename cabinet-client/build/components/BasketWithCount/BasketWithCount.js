import React, { useMemo } from 'react';
import styles from './BasketWithCount.module.styl';
import { useNavigate } from 'react-router-dom';
import { IconStorage } from '@consta/uikit/IconStorage';
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectBasket } from "../../store/features/basket/BasketSelectors";
import { PublicRoutesEnum } from "../../utils/enum";
const BasketWithCount = () => {
    const basket = useAppSelector(selectBasket);
    const navigate = useNavigate();
    const countInOrder = useMemo(() => {
        if (basket) {
            return basket.items.reduce((accum, item) => accum + item.count, 0);
        }
        else
            return null;
    }, [basket]);
    return (React.createElement("div", { onClick: () => navigate(`${PublicRoutesEnum.VIEW_ORDER}`), className: styles.Container },
        React.createElement(IconStorage, { className: styles.icon, view: 'ghost' }),
        countInOrder ? (React.createElement("div", { className: styles.Container__cnt }, countInOrder)) : (React.createElement("div", null))));
};
export default BasketWithCount;
//# sourceMappingURL=BasketWithCount.js.map