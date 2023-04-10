import React from 'react';
import { DeviceListModel } from 'src/api/models/DeviceListModel';
import AdministrationListItem from '../AdministrationListItem/AdministrationListItem';
import styles from './AdministrationRecipesList.styl';
import { PrivateRoutesEnum } from 'src/router';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
interface IComponentProps {
  recipes: DeviceListModel[];
  activeList: number | null;
  setActiveList: React.Dispatch<React.SetStateAction<number | null>>;
}

const AdministrationRecipesList: React.FC<IComponentProps> = ({
  recipes,
  activeList,
  setActiveList,
}) => {
  const navigate = useNavigate();
  return (
    <div className={styles.RecipesList}>
      <Button
        onClick={() => {
          navigate(
            `${PrivateRoutesEnum.ADMINISTRATION}/${PrivateRoutesEnum.RECIPES}/create`,
          );
        }}
      >
        Создать новый рецепт
      </Button>
      {recipes.length > 0 &&
        recipes.map((item, index) => (
          <AdministrationListItem
            key={index}
            activeElement={activeList}
            item={item}
            setActiveList={setActiveList}
          />
        ))}
    </div>
  );
};

export default AdministrationRecipesList;
