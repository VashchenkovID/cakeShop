import React, { useEffect, useState } from 'react';
import styles from './AdministrationRecipes.styl';
import AdministrationRecipesCreate from 'src/pages/AdministrationPage/AdministrationRecipesCreate/AdministrationRecipesCreate';
import useRequest from 'src/hooks/useRequest';
import cakesApi from 'src/api/requests/cakesApi';
import { DeviceListModel } from 'src/api/models/DeviceListModel';
import AdministrationRecipesList from 'src/pages/AdministrationPage/AdministrationRecipesList/AdministrationRecipesList';
import AdministrationRecipesViewById from 'src/pages/AdministrationPage/AdministrationRecipesViewById/AdministrationRecipesViewById';
import { useLocation } from 'react-router-dom';
import { PaginationStateType } from 'src/components/PaginationCustom/PaginationCustom';
export enum AdminPageMode {
  CREATE = 'create',
  EDIT = 'edit',
  VIEW = 'view',
}

const AdministrationRecipes = () => {
  const location = useLocation();
  const [pageMode, setPageMode] = useState(AdminPageMode.VIEW);
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
    if (location.pathname.includes('create')) {
      setPageMode(AdminPageMode.CREATE);
    } else if (location.pathname.includes('edit')) {
      setPageMode(AdminPageMode.EDIT);
    } else setPageMode(AdminPageMode.VIEW);
  }, [location]);

  useEffect(() => {
    fetchRecipes({
      page: pagination.page,
      limit: pagination.perPage,
    });
  }, [pageMode, pagination]);

  return (
    <>
      {pageMode === AdminPageMode.VIEW && (
        <section className={styles.Recipes}>
          <AdministrationRecipesList
            recipes={recipes}
            activeList={activeList}
            setActiveList={setActiveList}
            count={count}
            pagination={pagination}
            setPagination={setPagination}
          />
          <AdministrationRecipesViewById
            activeList={activeList}
            pageMode={pageMode}
            setPageMode={setPageMode}
          />
        </section>
      )}
      {pageMode === AdminPageMode.CREATE && <AdministrationRecipesCreate />}
      {pageMode === AdminPageMode.EDIT && <AdministrationRecipesCreate />}
    </>
  );
};

export default AdministrationRecipes;
