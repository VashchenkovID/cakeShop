import React from 'react';
import { User } from '@consta/uikit/User';
import StarRating from 'src/components/StarRating/StarRating';
import Textarea from 'src/components/Textarea/Textarea';
import styles from './AdministrationFeedbackRatingItem.module.styl';
const AdministrationFeedbackRatingItem = ({ item, }) => {
    return (React.createElement("div", { className: styles.Rating },
        React.createElement("div", { className: styles.Rating__header },
            React.createElement(User, { name: item.user, info: new Date(item.createdAt).toLocaleDateString() }),
            React.createElement(StarRating, { rating: Number(item.rating), readonly: true })),
        React.createElement(Textarea, { text: item.ratingComment || 'Пользователь не оставил комментарий' })));
};
export default AdministrationFeedbackRatingItem;
//# sourceMappingURL=AdministrationFeedbackRatingItem.js.map