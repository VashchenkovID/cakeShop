import React from "react";
import ComponentStyleWrapper from "src/components/ComponentStyleWrapper/ComponentStyleWrapper";
import { Text } from "@consta/uikit/Text";
import StarRating from "src/components/StarRating/StarRating";
import Textarea from "src/components/Textarea/Textarea";
import { IconFavorite } from "@consta/uikit/IconFavorite";
import styles from './FeedbackItem.module.styl';
const FeedbackItem = ({ rating, width }) => {
    return (React.createElement(ComponentStyleWrapper, null,
        React.createElement("div", { className: styles.Item },
            React.createElement("div", { className: styles.Item__header },
                React.createElement(Text, null, rating.deviceName || ""),
                width >= 500 ? (React.createElement(StarRating, { rating: Number(rating.rating), readonly: true })) : (React.createElement("div", { className: styles.Item__mobileRating },
                    React.createElement(Text, { size: 's' }, rating.rating),
                    React.createElement(IconFavorite, { className: styles.Item__star })))),
            React.createElement(Textarea, { text: rating.ratingComment }))));
};
export default FeedbackItem;
//# sourceMappingURL=FeedbackItem.js.map