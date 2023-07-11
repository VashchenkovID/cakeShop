import React, { useEffect, useState } from "react";
import useRequest from "src/hooks/useRequest";
import ratingsApi from "src/api/requests/ratingsApi";
import PaginationCustom from "src/components/PaginationCustom/PaginationCustom";
import { useResize } from "src/hooks/useResize";
import ComponentStyleWrapper from "src/components/ComponentStyleWrapper/ComponentStyleWrapper";
import { Text } from "@consta/uikit/Text";
import FeedbackItem from "src/pages/Feedback/FeedbackItem/FeedbackItem";
import styles from "./Feedback.module.styl";
import { Button } from "@consta/uikit/Button";
import { IconAdd } from "@consta/uikit/IconAdd";
const Feedback = () => {
    const { width } = useResize();
    const [ratings, setRatings] = useState([]);
    const { load: fetchRatings, isLoading } = useRequest(ratingsApi.getUserRatings, (data) => {
        if (data) {
            setRatings(data.data.rows);
            setCount(data.data.count);
        }
    });
    const [pagination, setPagination] = useState({
        page: 1,
        perPage: 100,
    });
    const [count, setCount] = useState(0);
    useEffect(() => {
        fetchRatings({ limit: pagination.perPage, page: pagination.page });
    }, [pagination]);
    return (React.createElement("div", { className: styles.Feedback },
        React.createElement(ComponentStyleWrapper, null,
            React.createElement("div", { className: styles.Feedback__body },
                React.createElement("div", { className: styles.Feedback__header },
                    React.createElement(Text, { size: width <= 500 ? 'l' : "3xl" }, "\u041C\u043E\u0438 \u043E\u0442\u0437\u044B\u0432\u044B"),
                    React.createElement(Button, { label: "Новый отзыв", iconLeft: IconAdd, size: width <= 800 ? "xs" : "s" })),
                React.createElement("div", { className: styles.Feedback__rows }, ratings.length > 0 &&
                    !isLoading &&
                    ratings.map((item) => (React.createElement(FeedbackItem, { rating: item, width: width, key: item.id })))),
                React.createElement(PaginationCustom, { total: count, pagination: pagination, setPagination: setPagination })))));
};
export default Feedback;
//# sourceMappingURL=Feedback.js.map