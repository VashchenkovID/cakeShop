import React, { useEffect, useState } from 'react';
import useRequest from 'src/hooks/useRequest';
import cakesApi from 'src/api/requests/cakesApi';
import { PaginationStateType } from 'src/components/PaginationCustom/PaginationCustom';
import { DeviceListModel } from 'src/api/models/DeviceListModel';
import AdministrationFeedbackList from 'src/pages/AdministrationPage/AdministrationFeedback/AdministrationFeedbackList/AdministrationFeedbackList';

const AdministrationFeedback: React.FC = () => {
  const [activeElement, setActiveElement] = useState<number | null>(null);
  const [count, setCount] = useState<number>(0);
  const [devices, setDevices] = useState<DeviceListModel[]>([]);
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
  const {
    load: fetchFullDevice,
    data: fullItem,
    isLoading: isItemLoading,
  } = useRequest(cakesApi.loadOneCake);

  useEffect(() => {
    fetchDevices({
      limit: pagination.perPage,
      page: pagination.page,
    });
  }, [pagination]);

  useEffect(() => {
    if (activeElement) {
      fetchFullDevice(String(activeElement));
    }
  }, [activeElement]);

  return (
    <div>
      <AdministrationFeedbackList
        devices={devices}
        count={count}
        pagination={pagination}
        setPagination={setPagination}
        isLoading={isLoading}
        activeElement={activeElement}
        setActiveList={setActiveElement}
      />
    </div>
  );
};

export default AdministrationFeedback;
