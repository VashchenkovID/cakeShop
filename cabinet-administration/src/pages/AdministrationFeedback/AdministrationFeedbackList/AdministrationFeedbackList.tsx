import React from 'react';
import { DeviceListModel } from 'src/api/models/DeviceListModel';
import PaginationCustom, {
  PaginationStateType,
} from 'src/components/PaginationCustom/PaginationCustom';
import { ListLoader } from '@consta/uikit/ListCanary';
import AdministrationFeedbackListItem from 'src/pages/AdministrationFeedback/AdministrationFeedbackListItem/AdministrationFeedbackListItem';
import styles from './AdministrationFeedbackList.styl';
import InformerBadge from 'src/components/Informer/Informer';

interface IComponentProps {
  devices: DeviceListModel[];
  count: number;
  pagination: PaginationStateType;
  setPagination: React.Dispatch<React.SetStateAction<PaginationStateType>>;
  isLoading: boolean;
  activeElement: number | null;
  setActiveList: React.Dispatch<React.SetStateAction<number | null>>;
}

const AdministrationFeedbackList: React.FC<IComponentProps> = ({
  devices,
  count,
  pagination,
  setPagination,
  isLoading,
  activeElement,
  setActiveList,
}) => {
  return (
    <div className={styles.FeedbackList}>
      {isLoading && <ListLoader />}
      {!isLoading &&
        devices &&
        devices.length > 0 &&
        devices.map((device, index) => (
          <AdministrationFeedbackListItem
            key={`${index}_${device.id}`}
            activeElement={activeElement}
            setActiveList={setActiveList}
            item={device}
          />
        ))}
      {devices.length === 0 && <InformerBadge text={'Список пуст'} />}
      <PaginationCustom
        total={count}
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  );
};

export default AdministrationFeedbackList;
