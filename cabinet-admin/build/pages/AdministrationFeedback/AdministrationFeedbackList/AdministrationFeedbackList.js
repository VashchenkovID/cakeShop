import React from 'react';
import PaginationCustom from 'src/components/PaginationCustom/PaginationCustom';
import { ListLoader } from '@consta/uikit/ListCanary';
import AdministrationFeedbackListItem from 'src/pages/AdministrationFeedback/AdministrationFeedbackListItem/AdministrationFeedbackListItem';
import styles from './AdministrationFeedbackList.module.styl';
import InformerBadge from 'src/components/Informer/Informer';
const AdministrationFeedbackList = ({ devices, count, pagination, setPagination, isLoading, activeElement, setActiveList, }) => {
    return (React.createElement("div", { className: styles.FeedbackList },
        isLoading && React.createElement(ListLoader, null),
        !isLoading &&
            devices &&
            devices.length > 0 &&
            devices.map((device, index) => (React.createElement(AdministrationFeedbackListItem, { key: `${index}_${device.id}`, activeElement: activeElement, setActiveList: setActiveList, item: device }))),
        devices.length === 0 && React.createElement(InformerBadge, { text: 'Список пуст' }),
        React.createElement(PaginationCustom, { total: count, pagination: pagination, setPagination: setPagination })));
};
export default AdministrationFeedbackList;
//# sourceMappingURL=AdministrationFeedbackList.js.map