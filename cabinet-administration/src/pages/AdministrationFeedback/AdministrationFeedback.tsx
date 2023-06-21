import React, { useEffect, useState } from 'react';
import useRequest from 'src/hooks/useRequest';
import cakesApi from 'src/api/requests/cakesApi';
import { PaginationStateType } from 'src/components/PaginationCustom/PaginationCustom';
import { DeviceListModel } from 'src/api/models/DeviceListModel';
import AdministrationFeedbackList from 'src/pages/AdministrationFeedback/AdministrationFeedbackList/AdministrationFeedbackList';
import styles from './AdministrationFeedback.styl';
import ratingsApi from 'src/api/requests/ratingsApi';
import AdministrationFeedbackRatings from 'src/pages/AdministrationFeedback/AdministrationFeedbackRatings/AdministrationFeedbackRatings';
import { RatingItemModel } from 'src/api/models/RatingItemModel';
import MainWrapper from 'src/components/MainWrapper/MainWrapper';

const AdministrationFeedback: React.FC = () => {
  const [activeElement, setActiveElement] = useState<number | null>(null);
  const [count, setCount] = useState<number>(0);
  const [devices, setDevices] = useState<DeviceListModel[]>([]);
  const [ratings, setRatings] = useState<RatingItemModel[]>([]);
  const [limit, setLimit] = useState<number>(10);
  const [pagination, setPagination] = useState<PaginationStateType>({
    page: 1,
    perPage: 10,
  });
  const { load: fetchDevices, isLoading } = useRequest(
    cakesApi.loadAllCakes,
    (data) => {
      setCount(data.data.count);
      setDevices(data.data.rows);
    },
  );
  const { load: fetchFullDevice, isLoading: isItemLoading } = useRequest(
    ratingsApi.getDeviceRatings,
    (data) => {
      if (data) {
        setRatings(data.data.rows);
      }
    },
  );

  useEffect(() => {
    fetchDevices({
      limit: pagination.perPage,
      page: pagination.page,
    });
  }, [pagination]);

  useEffect(() => {
    if (activeElement) {
      fetchFullDevice({
        device_id: String(activeElement),
        limit: limit,
        page: 1,
      });
    }
  }, [activeElement, limit]);

  return (
    <MainWrapper title={'Отзывы покупателей'}>
      <section className={styles.Feedback}>
        <AdministrationFeedbackList
          devices={devices}
          count={count}
          pagination={pagination}
          setPagination={setPagination}
          isLoading={isLoading}
          activeElement={activeElement}
          setActiveList={setActiveElement}
        />
        <AdministrationFeedbackRatings
          ratings={ratings}
          isLoading={isItemLoading}
          setLimit={setLimit}
          limit={limit}
          activeItem={activeElement}
        />
      </section>
    </MainWrapper>
  );
};

export default AdministrationFeedback;
