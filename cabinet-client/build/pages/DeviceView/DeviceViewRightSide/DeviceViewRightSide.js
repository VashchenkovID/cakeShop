import React, { useState } from "react";
import { Text } from "@consta/uikit/Text";
import ComponentStyleWrapper from "../../../components/ComponentStyleWrapper/ComponentStyleWrapper";
import styles from "../DeviceView.module.styl";
import { Button } from "@consta/uikit/Button";
import DeviceViewRightSideItem from "../DeviceViewRightSideItem/DeviceViewRightSideItem";
const DeviceViewRightSide = ({ ratings, count, setPagination, width, isLoading, }) => {
    const [isViewMore, setIsViewMore] = useState(false);
    return (React.createElement(ComponentStyleWrapper, null,
        React.createElement("div", { className: styles.Device__rightSide },
            React.createElement("div", null,
                React.createElement(Text, { size: "2xl" }, "\u041E\u0442\u0437\u044B\u0432\u044B \u043F\u043E\u043A\u0443\u043F\u0430\u0442\u0435\u043B\u0435\u0439"),
                React.createElement(Text, { size: "xs", view: "secondary" }, count !== 0
                    ? `На десерт оставлено ${count} отзывов`
                    : "На десерт еще не оставлены отзывы")),
            !isLoading && (React.createElement("div", null, width <= 800 ? (React.createElement("div", null,
                isViewMore ? (React.createElement("div", { className: styles.Device__rightSide__items }, ratings.length > 0 &&
                    ratings.map((item, index) => (React.createElement(DeviceViewRightSideItem, { width: width, item: item, key: `${item.id}_${index}` }))))) : (React.createElement("div", { className: styles.Device__rightSide__items }, ratings.length > 0 &&
                    ratings
                        .slice(0, 3)
                        .map((item, index) => (React.createElement(DeviceViewRightSideItem, { width: width, item: item, key: `${item.id}_${index}` }))))),
                !isViewMore && (React.createElement(Button, { label: "Показать еще", view: "clear", className: styles.ViewMore, size: "xs", onClick: () => setIsViewMore(true) })))) : (React.createElement("div", { className: styles.Device__rightSide__items }, ratings.length > 0 &&
                ratings.map((item, index) => (React.createElement(DeviceViewRightSideItem, { width: width, item: item, key: `${item.id}_${index}` }))))))),
            React.createElement("div", { className: styles.Device__rightSide__action },
                React.createElement(Button, { label: "Загрузить еще", size: width <= 500 ? "xs" : "s", onClick: () => setPagination((prevState) => {
                        return { ...prevState, limit: prevState.limit + 10 };
                    }), loading: isLoading, disabled: count === ratings.length })))));
};
export default DeviceViewRightSide;
//# sourceMappingURL=DeviceViewRightSide.js.map