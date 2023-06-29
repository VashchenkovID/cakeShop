import React from "react";
import ComponentStyleWrapper from "../../../components/ComponentStyleWrapper/ComponentStyleWrapper";
import styles from "../DeviceView.module.styl";
import { User } from "@consta/uikit/User";
import StarRating from "../../../components/StarRating/StarRating";
import Textarea from "../../../components/Textarea/Textarea";
import { Text } from "@consta/uikit/Text";
import { IconFavorite } from "@consta/uikit/IconFavorite";
const DeviceViewRightSideItem = ({ item, width, }) => {
    return (React.createElement(ComponentStyleWrapper, { key: item.id },
        React.createElement("div", { className: styles.Device__rightSide__item },
            React.createElement("div", { className: styles.Device__rightSide__item__header },
                React.createElement(User, { name: item.user }),
                width <= 500 ? (React.createElement("div", { className: styles.Device__rightSide__item__mobile },
                    React.createElement(Text, { size: "s" }, item.rating),
                    React.createElement(IconFavorite, { className: styles.Device__rightSide__item__mobile__star }))) : (React.createElement(StarRating, { rating: Number(item.rating), readonly: true }))),
            React.createElement(Textarea, { className: styles.Device__rightSide__item__textarea, text: item.ratingComment, size: width <= 500 ? "xs" : "s" }))));
};
export default DeviceViewRightSideItem;
//# sourceMappingURL=DeviceViewRightSideItem.js.map