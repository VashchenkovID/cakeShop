import React from 'react';
import { DeviceListModel } from 'src/api/models/DeviceListModel';
import AdministrationListItem from '../AdministrationListItem/AdministrationListItem';
import styles from './AdministrationRecipesList.styl';
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
  return (
    <div className={styles.RecipesList}>
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
