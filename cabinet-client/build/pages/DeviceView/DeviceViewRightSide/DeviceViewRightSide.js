import React from "react";
import { Text } from "@consta/uikit/Text";
import ComponentStyleWrapper from "../../../components/ComponentStyleWrapper/ComponentStyleWrapper";
import styles from "../DeviceView.module.styl";
import { Button } from "@consta/uikit/Button";
import DeviceViewRightSideItem from "../DeviceViewRightSideItem/DeviceViewRightSideItem";
const DeviceViewRightSide = ({ ratings, count, setPagination, width, }) => {
    return (React.createElement(ComponentStyleWrapper, null,
        React.createElement("div", { className: styles.Device__rightSide },
            React.createElement(Text, { size: "2xl" }, "\u041E\u0442\u0437\u044B\u0432\u044B \u043F\u043E\u043A\u0443\u043F\u0430\u0442\u0435\u043B\u0435\u0439"),
            React.createElement("div", { className: styles.Device__rightSide__items }, ratings.length > 0 &&
                ratings.map((item, index) => (React.createElement(DeviceViewRightSideItem, { width: width, item: item, key: `${item.id}_${index}` })))),
            React.createElement("div", { className: styles.Device__rightSide__action },
                React.createElement(Button, { label: "Загрузить еще", size: "s", onClick: () => setPagination((prevState) => {
                        return { ...prevState, limit: prevState.limit + 10 };
                    }) })))));
};
export default DeviceViewRightSide;
//# sourceMappingURL=DeviceViewRightSide.js.map