import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useRequest from 'src/hooks/useRequest';
import cakesApi from 'src/api/requests/cakesApi';
import { DeviceItemModel } from 'src/api/models/DeviceItemModel';
import { Loader } from '@consta/uikit/Loader';
import styles from './AddRatingPage.styl';
import AddRatingCreate from 'src/pages/AddRatingPage/AddRatingCreate/AddRatingCreate';
import AddRatingViewCard from 'src/pages/AddRatingPage/AddRatingViewCard/AddRatingViewCard';

const AddRatingPage: React.FC = () => {
  const params = useParams();
  const [device, setDevice] = useState<DeviceItemModel | null>(null);
  const { load: getDeviceInfo, isLoading: isDeviceLoading } = useRequest(
    cakesApi.loadOneCake,
    (data) => {
      if (data) {
        setDevice(data);
      }
    },
  );

  useEffect(() => {
    if (params.id) {
      getDeviceInfo(params.id);
    }
  }, [params]);

  return (
    <div className={styles.AddRatingPage}>
      {isDeviceLoading && (
        <div className={styles.AddRatingPage__loader}>
          <Loader />
        </div>
      )}
      {!isDeviceLoading && (
        <div className={styles.AddRatingPage__container}>
          {device && <AddRatingCreate deviceId={device.id} />}
          {device && (
            <div className={styles.AddRatingPage__rightSide}>
              <AddRatingViewCard item={device} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddRatingPage;
