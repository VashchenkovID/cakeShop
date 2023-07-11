import React, { useState } from "react";
import ratingsApi from "../../../api/requests/ratingsApi";
import { TextField } from "@consta/uikit/TextField";
import StarRating from "../../../components/StarRating/StarRating";
import { Button } from "@consta/uikit/Button";
import { Text } from "@consta/uikit/Text";
import styles from "./DeviceCreateRatingModal.module.styl";
import { IconClose } from "@consta/uikit/IconClose";
const DeviceCreateRatingModal = ({ onClose, device_id, deviceName, width, fetchRatings, fetchDevice, }) => {
    const [modalState, setModalState] = useState({
        rating: 0,
        ratingComment: "",
        device_id: device_id.toString(),
    });
    const onSave = async () => {
        await ratingsApi
            .createRating({
            device_id: device_id.toString(),
            rating: modalState.rating,
            ratingComment: modalState.ratingComment,
        })
            .then((r) => {
            if (r.data) {
                fetchRatings({
                    device_id: device_id.toString(),
                    limit: 10,
                    page: 1,
                });
                fetchDevice(device_id.toString());
                onClose();
            }
        });
    };
    return (React.createElement("div", { className: styles.Rating },
        React.createElement("div", { className: styles.Rating__header },
            React.createElement(Text, { size: width <= 500 ? "s" : "2xl" },
                "\u0420\u0435\u0439\u0442\u0438\u043D\u0433 \u0434\u0435\u0441\u0435\u0440\u0442\u0430 ",
                deviceName),
            React.createElement(Button, { iconLeft: IconClose, view: "clear", size: width <= 500 ? "s" : "m", onClick: onClose })),
        React.createElement("div", { className: styles.Rating__body },
            React.createElement("div", { className: styles.Rating__body },
                React.createElement(Text, { size: width <= 500 ? "s" : "m" }, "\u041E\u0446\u0435\u043D\u043A\u0430:"),
                React.createElement(StarRating, { rating: modalState.rating, setRating: (value) => setModalState((prevState) => {
                        return { ...prevState, rating: value };
                    }) })),
            React.createElement(TextField, { form: "round", size: "s", type: "textarea", width: "full", rows: width <= 500 ? 5 : 8, cols: 70, label: "Комментарий", placeholder: "Введите комментарий к отзыву", value: modalState.ratingComment, onChange: ({ value }) => setModalState((prevState) => {
                    return { ...prevState, ratingComment: value || "" };
                }) })),
        React.createElement("div", { className: styles.Rating__actions },
            React.createElement(Button, { label: "Отменить", size: width <= 500 ? "xs" : "s", onClick: onClose }),
            React.createElement(Button, { label: "Создать", size: width <= 500 ? "xs" : "s", onClick: onSave }))));
};
export default DeviceCreateRatingModal;
//# sourceMappingURL=DeviceCreateRatingModal.js.map