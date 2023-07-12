import React from 'react';
import { Loader } from '@consta/uikit/Loader';
import AdministrationFeedbackRatingItem from 'src/pages/AdministrationFeedback/AdministrationFeedbackRatingItem/AdministrationFeedbackRatingItem';
import styles from './AdministrationFeedbackRatings.module.styl';
import InformerBadge from 'src/components/Informer/Informer';
import PaginationCustom from 'src/components/PaginationCustom/PaginationCustom';
const AdministrationFeedbackRatings = ({ ratings, isLoading, limit, activeItem, pagination, setPagination, }) => {
    return (React.createElement("div", null,
        isLoading && React.createElement(Loader, null),
        !isLoading && (React.createElement(React.Fragment, null,
            React.createElement("div", { className: styles.Ratings },
                ratings.length > 0 &&
                    ratings.map((rating, index) => (React.createElement(AdministrationFeedbackRatingItem, { item: rating, key: `${rating.id}_${index}` }))),
                activeItem && ratings.length === 0 && (React.createElement(InformerBadge, { text: 'Пользователи еще не оставили рейтинги на данное изделие' })),
                !activeItem && (React.createElement(InformerBadge, { text: 'Выберите изделие из меню слева' }))),
            activeItem && ratings.length > 0 && (React.createElement(PaginationCustom, { className: styles.Ratings__footer, total: limit, pagination: pagination, setPagination: setPagination }))))));
};
export default AdministrationFeedbackRatings;
//# sourceMappingURL=AdministrationFeedbackRatings.js.map