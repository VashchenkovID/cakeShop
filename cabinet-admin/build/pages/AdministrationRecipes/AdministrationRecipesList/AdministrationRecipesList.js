import React from 'react';
import AdministrationListItem from '../AdministrationListItem/AdministrationListItem';
import styles from './AdministrationRecipesList.module.styl';
import { useNavigate } from 'react-router-dom';
import { Button } from '@consta/uikit/Button';
import PaginationCustom from 'src/components/PaginationCustom/PaginationCustom';
import InformerBadge from 'src/components/Informer/Informer';
const AdministrationRecipesList = ({ recipes, activeList, setActiveList, count, pagination, setPagination, }) => {
    const navigate = useNavigate();
    return (React.createElement("div", { className: styles.RecipesList },
        React.createElement(Button, { onClick: () => {
                navigate(`${"/create-cake" /* PrivateRoutesEnum.CREATE_CAKE */}`);
            }, label: 'Создать новый рецепт' }),
        React.createElement("div", { className: styles.RecipesList__items },
            recipes.length > 0 &&
                recipes.map((item, index) => (React.createElement(AdministrationListItem, { key: index, activeElement: activeList, item: item, setActiveList: setActiveList }))),
            recipes.length === 0 && (React.createElement(InformerBadge, { text: 'Список рецептов пуст' }))),
        React.createElement(PaginationCustom, { total: count, pagination: pagination, setPagination: setPagination })));
};
export default AdministrationRecipesList;
//# sourceMappingURL=AdministrationRecipesList.js.map