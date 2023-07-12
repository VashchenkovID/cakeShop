import React, { useEffect, useState } from 'react';
import styles from './AdministrationRecipes.module.styl';
import useRequest from 'src/hooks/useRequest';
import cakesApi from 'src/api/requests/cakesApi';
import AdministrationRecipesList from 'src/pages/AdministrationRecipes/AdministrationRecipesList/AdministrationRecipesList';
import AdministrationRecipesViewById from 'src/pages/AdministrationRecipes/AdministrationRecipesViewById/AdministrationRecipesViewById';
import MainWrapper from 'src/components/MainWrapper/MainWrapper';
const AdministrationRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [count, setCount] = useState(0);
    const [activeList, setActiveList] = useState(null);
    const [pagination, setPagination] = useState({
        page: 1,
        perPage: 10,
    });
    const { load: fetchRecipes } = useRequest(cakesApi.loadAllCakes, (data) => {
        if (data) {
            setRecipes(data.data.rows);
            setCount(data.data.count);
        }
    });
    useEffect(() => {
        fetchRecipes({
            page: pagination.page,
            limit: pagination.perPage,
        });
    }, [pagination]);
    return (React.createElement(MainWrapper, { title: 'Рецепты' },
        React.createElement("section", { className: styles.Recipes },
            React.createElement(AdministrationRecipesList, { recipes: recipes, activeList: activeList, setActiveList: setActiveList, count: count, pagination: pagination, setPagination: setPagination }),
            React.createElement(AdministrationRecipesViewById, { activeList: activeList }))));
};
export default AdministrationRecipes;
//# sourceMappingURL=AdministrationRecipes.js.map