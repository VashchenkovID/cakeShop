import React, { useEffect, useState } from 'react';
import useRequest from 'src/hooks/useRequest';
import uniqUsersApi from 'src/api/requests/uniqUsersApi';
import { Tabs } from '@consta/uikit/Tabs';
import { UniqUsersModel } from 'src/api/models/UniqUsersModel';
import { Text } from '@consta/uikit/Text';
import { Loader } from '@consta/uikit/Loader';
import styles from './MainPageUsers.module.styl';

interface MainPageUsersTabs {
  id: number;
  label: string;
  date: Date;
  type: 'month' | 'full';
}

const tabItems: MainPageUsersTabs[] = [
  { id: 0, label: 'За месяц', date: new Date(), type: 'month' },
  { id: 1, label: 'За все время', date: new Date(), type: 'full' },
];

const MainPageUsers: React.FC = () => {
  const [info, setInfo] = useState<UniqUsersModel | null>(null);
  const [tab, setTab] = useState<MainPageUsersTabs>(tabItems[0]);
  const { load: fetchUsers, isLoading } = useRequest(
    uniqUsersApi.loadUniqUsers,
    (data) => {
      if (data) {
        setInfo(data.data);
      }
    },
  );
  useEffect(() => {
    fetchUsers(tab.date.toISOString(), tab.type);
  }, [tab]);
  return (
    <div>
      <Tabs
        items={tabItems}
        value={tab}
        onChange={({ value }) => {
          setTab(value);
        }}
      />
      {!isLoading && info && info.users && (
        <Text size={'3xl'} align={'center'}>
          {info.users}
        </Text>
      )}
      {isLoading && <Loader className={styles.Users__loader} />}
    </div>
  );
};

export default MainPageUsers;
