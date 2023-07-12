import React from 'react';
import { DeviceListModel } from 'src/api/models/DeviceListModel';
import AdministrationListItem from '../AdministrationListItem/AdministrationListItem';
import styles from './AdministrationRecipesList.module.styl';
import { PrivateRoutesEnum } from 'src/router';
import { useNavigate } from 'react-router-dom';
import { Button } from '@consta/uikit/Button';
import PaginationCustom, {
  PaginationStateType,
} from 'src/components/PaginationCustom/PaginationCustom';
import { Text } from '@consta/uikit/Text';
import InformerBadge from 'src/components/Informer/Informer';

interface IComponentProps {
  recipes: DeviceListModel[];
  activeList: number | null;
  setActiveList: React.Dispatch<React.SetStateAction<number | null>>;
  setPagination: React.Dispatch<React.SetStateAction<PaginationStateType>>;
  pagination: PaginationStateType;
  count: number;
}

const AdministrationRecipesList: React.FC<IComponentProps> = ({
  recipes,
  activeList,
  setActiveList,
  count,
  pagination,
  setPagination,
}) => {
  const navigate = useNavigate();
  return (
    <div className={styles.RecipesList}>
      <Button
        onClick={() => {
          navigate(
            `${PrivateRoutesEnum.CREATE_CAKE}`,
          );
        }}
        label={'Создать новый рецепт'}
      />
      <div className={styles.RecipesList__items}>
        {recipes.length > 0 &&
          recipes.map((item, index) => (
            <AdministrationListItem
              key={index}
              activeElement={activeList}
              item={item}
              setActiveList={setActiveList}
            />
          ))}
        {recipes.length === 0 && (
          <InformerBadge text={'Список рецептов пуст'} />
        )}
      </div>
      <PaginationCustom
        total={count}
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  );
};

export default AdministrationRecipesList;
