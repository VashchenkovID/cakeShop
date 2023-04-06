import React, { useEffect, useState } from 'react';
import styles from './AdministrationRecipes.styl';
import cn from 'classnames/bind';
import AdministrationRecipesCreate from 'src/pages/AdministrationPage/AdministrationRecipesCreate/AdministrationRecipesCreate';
import useRequest from 'src/hooks/useRequest';
import cakesApi from 'src/api/requests/cakesApi';
import { DeviceListModel } from 'src/api/models/DeviceListModel';
import AdministrationRecipesList from 'src/pages/AdministrationPage/AdministrationRecipesList/AdministrationRecipesList';
import AdministrationRecipesViewById from 'src/pages/AdministrationPage/AdministrationRecipesViewById/AdministrationRecipesViewById';

const cx = cn.bind(styles);

export enum AdminPageMode {
  CREATE = 'create',
  EDIT = 'edit',
  VIEW = 'view',
}

const AdministrationRecipes = () => {
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
    fetchRecipes();
  }, []);
  return (
    <>
      <div
        onClick={() => {
          setPageMode(AdminPageMode.CREATE);
        }}
      >
        Создать новый рецепт
      </div>
      {pageMode === AdminPageMode.VIEW && (
        <section className={styles.Recipes}>
          <AdministrationRecipesList
            recipes={recipes}
            activeList={activeList}
            setActiveList={setActiveList}
          />
          <AdministrationRecipesViewById activeList={activeList} />
        </section>
      )}
      {pageMode === AdminPageMode.CREATE && <AdministrationRecipesCreate />}
    </>
  );
};

export default AdministrationRecipes;
