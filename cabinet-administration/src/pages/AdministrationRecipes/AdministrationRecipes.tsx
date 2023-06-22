import React, { useEffect, useState } from 'react';
import styles from './AdministrationRecipes.styl';
import useRequest from 'src/hooks/useRequest';
import cakesApi from 'src/api/requests/cakesApi';
import { DeviceListModel } from 'src/api/models/DeviceListModel';
import AdministrationRecipesList from 'src/pages/AdministrationRecipes/AdministrationRecipesList/AdministrationRecipesList';
import AdministrationRecipesViewById from 'src/pages/AdministrationRecipes/AdministrationRecipesViewById/AdministrationRecipesViewById';
import { PaginationStateType } from 'src/components/PaginationCustom/PaginationCustom';
import MainWrapper from 'src/components/MainWrapper/MainWrapper';

const AdministrationRecipes = () => {
  const [recipes, setRecipes] = useState<DeviceListModel[]>([]);
  const [count, setCount] = useState<number>(0);
  const [activeList, setActiveList] = useState<number | null>(null);
  const [pagination, setPagination] = useState<PaginationStateType>({
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

  return (
    <MainWrapper title={'Рецепты'}>
      <section className={styles.Recipes}>
        <AdministrationRecipesList
          recipes={recipes}
          activeList={activeList}
          setActiveList={setActiveList}
          count={count}
          pagination={pagination}
          setPagination={setPagination}
        />
        <AdministrationRecipesViewById activeList={activeList} />
      </section>
    </MainWrapper>
  );
};

export default AdministrationRecipes;
