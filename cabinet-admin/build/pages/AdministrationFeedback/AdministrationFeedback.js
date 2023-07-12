import React, { useEffect, useState } from "react";
import useRequest from "src/hooks/useRequest";
import cakesApi from "src/api/requests/cakesApi";
import AdministrationFeedbackList from "src/pages/AdministrationFeedback/AdministrationFeedbackList/AdministrationFeedbackList";
import styles from "./AdministrationFeedback.module.styl";
import ratingsApi from "src/api/requests/ratingsApi";
import AdministrationFeedbackRatings from "src/pages/AdministrationFeedback/AdministrationFeedbackRatings/AdministrationFeedbackRatings";
import MainWrapper from "src/components/MainWrapper/MainWrapper";
const AdministrationFeedback = () => {
    const [activeElement, setActiveElement] = useState(null);
    const [count, setCount] = useState(0);
    const [devices, setDevices] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [limit, setLimit] = useState(10);
    const [pagination, setPagination] = useState({
        page: 1,
        perPage: 10,
    });
    const [paginationRatings, setPaginationRatings] = useState({
        page: 1,
        perPage: 10,
    });
    const { load: fetchDevices, isLoading } = useRequest(cakesApi.loadAllCakes, (data) => {
        if (data) {
            setCount(data.data.count);
            setDevices(data.data.rows);
        }
    });
    const { load: fetchFullDevice, isLoading: isItemLoading } = useRequest(ratingsApi.getDeviceRatings, (data) => {
        if (data) {
            setRatings(data.data.rows);
        }
    });
    useEffect(() => {
        fetchDevices({
            limit: pagination.perPage,
            page: pagination.page,
        });
    }, [pagination]);
    useEffect(() => {
        if (activeElement) {
            fetchFullDevice({
                device_id: String(activeElement),
                limit: paginationRatings.perPage,
                page: paginationRatings.page,
            });
        }
    }, [activeElement, paginationRatings]);
    return (React.createElement(MainWrapper, { title: "Отзывы покупателей" },
        React.createElement("section", { className: styles.Feedback },
            React.createElement(AdministrationFeedbackList, { devices: devices, count: count, pagination: pagination, setPagination: setPagination, isLoading: isLoading, activeElement: activeElement, setActiveList: setActiveElement }),
            React.createElement(AdministrationFeedbackRatings, { ratings: ratings, isLoading: isItemLoading, setLimit: setLimit, limit: limit, activeItem: activeElement, setPagination: setPaginationRatings, pagination: paginationRatings }))));
};
export default AdministrationFeedback;
//# sourceMappingURL=AdministrationFeedback.js.map