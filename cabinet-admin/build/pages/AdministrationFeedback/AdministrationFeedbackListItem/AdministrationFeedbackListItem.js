import React from 'react';
import styles from './AdministrationFeedbackListItem.module.styl';
import { Text } from '@consta/uikit/Text';
import cn from 'classnames/bind';
import ComponentStyleWrapper from 'src/components/ComponentStyleWrapper/ComponentStyleWrapper';
const cx = cn.bind(styles);
const AdministrationFeedbackListItem = ({ activeElement, item, setActiveList, }) => {
    return (React.createElement(ComponentStyleWrapper, null,
        React.createElement("div", { onClick: () => setActiveList(item.id), className: styles.RecipesListItem },
            React.createElement("div", { className: styles.RecipesListItem__titleContainer },
                React.createElement("img", { className: styles.RecipesListItem__image, src: `${import.meta.env.VITE_API_URL_IMAGE}${item.img}` }),
                React.createElement(Text, { className: cx(styles.RecipesListItem__title, {
                        active: activeElement === item.id,
                    }) }, item.name)),
            React.createElement(Text, { className: styles.RecipesListItem__price },
                item.price,
                " \u20BD"))));
};
export default AdministrationFeedbackListItem;
//# sourceMappingURL=AdministrationFeedbackListItem.js.map