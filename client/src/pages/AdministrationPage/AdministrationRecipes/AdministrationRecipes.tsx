import React, { useEffect, useState } from 'react';
import styles from './AdministrationRecipes.styl';
import cn from 'classnames/bind';
import AdministrationRecipesCreate from 'src/pages/AdministrationPage/AdministrationRecipesCreate/AdministrationRecipesCreate';
import useRequest from 'src/hooks/useRequest';
import cakesApi from 'src/api/requests/cakesApi';
import { DeviceListModel } from 'src/api/models/DeviceListModel';
import AdministrationRecipesList from 'src/pages/AdministrationPage/AdministrationRecipesList/AdministrationRecipesList';
import AdministrationRecipesViewById from 'src/pages/AdministrationPage/AdministrationRecipesViewById/AdministrationRecipesViewById';
import { useLocation, useNavigate } from 'react-router-dom';
import { PrivateRoutesEnum } from 'src/router';

const cx = cn.bind(styles);

export enum AdminPageMode {
  CREATE = 'create',
  EDIT = 'edit',
  VIEW = 'view',
}

const AdministrationRecipes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pageMode, setPageMode] = useState(AdminPageMode.VIEW);
  const [recipes, setRecipes] = useState<DeviceListModel[]>([]);
  const [count, setCount] = useState<number>(0);
  const [activeList, setActiveList] = useState<number | null>(null);

  const { load: fetchRecipes, isLoading } = useRequest(
    cakesApi.loadAllCakes,
    (data) => {
      if (data) {
        setRecipes(data.data.rows);
        setCount(data.data.count);
      }
    },
  );

  useEffect(() => {
    if (location.pathname.includes('create')) {
      setPageMode(AdminPageMode.CREATE);
    } else if (location.pathname.includes('edit')) {
      setPageMode(AdminPageMode.EDIT);
    } else setPageMode(AdminPageMode.VIEW);
  }, [location]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <>
      {pageMode === AdminPageMode.VIEW && (
        <section className={styles.Recipes}>
          <AdministrationRecipesList
            recipes={recipes}
            activeList={activeList}
            setActiveList={setActiveList}
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
