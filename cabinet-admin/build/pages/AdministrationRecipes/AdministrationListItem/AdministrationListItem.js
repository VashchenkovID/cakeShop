import React from 'react';
import styles from './AdministrationListItem.module.styl';
import { Text } from '@consta/uikit/Text';
import cn from 'classnames/bind';
import ComponentCard from 'src/components/ComponentCard/ComponentCard';
const cx = cn.bind(styles);
const AdministrationListItem = ({ activeElement, item, setActiveList, }) => {
    return (React.createElement(ComponentCard, { isActive: activeElement === item.id },
        React.createElement("div", { onClick: () => setActiveList(item.id), className: cx(styles.RecipesListItem) },
            React.createElement("div", { className: styles.RecipesListItem__titleContainer },
                React.createElement("img", { className: styles.RecipesListItem__image, src: `${import.meta.env.VITE_API_URL_IMAGE}${item.img}` }),
                React.createElement(Text, { className: cx(styles.RecipesListItem__title, {
                        active: activeElement === item.id,
                    }), size: 'l' },
                    item.name,
                    React.createElement(Text, { size: 's', view: 'secondary' },
                        "\u041E\u0442 ",
                        item.countWeightType,
                        " ",
                        item.weightType))),
            React.createElement(Text, { className: cx(styles.RecipesListItem__price, {
                    active: activeElement === item.id,
                }) },
                item.price,
                " \u20BD"))));
};
export default AdministrationListItem;
//# sourceMappingURL=AdministrationListItem.js.map