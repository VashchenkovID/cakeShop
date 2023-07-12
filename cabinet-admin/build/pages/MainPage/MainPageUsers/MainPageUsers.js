import React, { useEffect, useState } from 'react';
import useRequest from 'src/hooks/useRequest';
import uniqUsersApi from 'src/api/requests/uniqUsersApi';
import { Tabs } from '@consta/uikit/Tabs';
import { Text } from '@consta/uikit/Text';
import { Loader } from '@consta/uikit/Loader';
import styles from './MainPageUsers.module.styl';
const tabItems = [
    { id: 0, label: 'За месяц', date: new Date(), type: 'month' },
    { id: 1, label: 'За все время', date: new Date(), type: 'full' },
];
const MainPageUsers = () => {
    const [info, setInfo] = useState(null);
    const [tab, setTab] = useState(tabItems[0]);
    const { load: fetchUsers, isLoading } = useRequest(uniqUsersApi.loadUniqUsers, (data) => {
        if (data) {
            setInfo(data.data);
        }
    });
    useEffect(() => {
        fetchUsers(tab.date.toISOString(), tab.type);
    }, [tab]);
    return (React.createElement("div", null,
        React.createElement(Tabs, { items: tabItems, value: tab, onChange: ({ value }) => {
                setTab(value);
            } }),
        !isLoading && info && info.users && (React.createElement(Text, { size: '3xl', align: 'center' }, info.users)),
        isLoading && React.createElement(Loader, { className: styles.Users__loader })));
};
export default MainPageUsers;
//# sourceMappingURL=MainPageUsers.js.map