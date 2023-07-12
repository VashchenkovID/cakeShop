import React from 'react';
import styles from './ComponentCard.module.styl';
import cn from 'classnames/bind';
const cx = cn.bind(styles);
const ComponentCard = ({ children, isActive }) => {
    return (React.createElement("div", { className: cx(styles.ComponentCard, {
            active: isActive,
        }) }, children));
};
export default ComponentCard;
//# sourceMappingURL=ComponentCard.js.map