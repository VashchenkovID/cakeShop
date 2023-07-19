import React, { useState } from "react";
import ratingsApi, {
  CreateRatingReqBody,
  GetDeviceRatingsReqType,
} from "../../../api/requests/ratingsApi";
import { TextField } from "@consta/uikit/TextField";
import StarRating from "../../../components/StarRating/StarRating";
import { Button } from "@consta/uikit/Button";
import { Text } from "@consta/uikit/Text";
import styles from "./DeviceCreateRatingModal.module.styl";
import { IconClose } from "@consta/uikit/IconClose";

interface IComponentProps {
  onClose(): void;
  deviceName: string;
  device_id: number;
  width: number;
  fetchRatings: (data: GetDeviceRatingsReqType) => void;
  fetchDevice: (id: string) => void;
}

const DeviceCreateRatingModal: React.FC<IComponentProps> = ({
  onClose,
  device_id,
  deviceName,
  width,
  fetchRatings,
  fetchDevice,
}) => {
  const [modalState, setModalState] = useState<CreateRatingReqBody>({
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

  return (
    <div className={styles.Rating}>
      <div className={styles.Rating__header}>
        <Text size={width <= 500 ? "s" : "2xl"} view={"brand"}>
          Рейтинг десерта {deviceName}
        </Text>
        <Button
          iconLeft={IconClose}
          view={"clear"}
          size={width <= 500 ? "xs" : "s"}
          onClick={onClose}
        />
      </div>
      <div className={styles.Rating__body}>
        <div className={styles.Rating__body}>
          <Text size={width <= 500 ? "s" : "m"} view={"brand"}>
            Оценка:
          </Text>
          <StarRating
            rating={modalState.rating}
            setRating={(value) =>
              setModalState((prevState) => {
                return { ...prevState, rating: value };
              })
            }
          />
        </div>
        <TextField
          className={styles.datePick}
          form={"round"}
          size={"s"}
          type={"textarea"}
          width={"full"}
          rows={width <= 500 ? 5 : 8}
          cols={70}
          label={"Комментарий"}
          placeholder={"Введите комментарий к отзыву"}
          value={modalState.ratingComment}
          onChange={({ value }) =>
            setModalState((prevState) => {
              return { ...prevState, ratingComment: value || "" };
            })
          }
        />
      </div>

      <div className={styles.Rating__actions}>
        <Button
          label={"Отменить"}
          size={width <= 500 ? "xs" : "s"}
          onClick={onClose}
          view={'secondary'}
        />
        <Button
          label={"Создать"}
          size={width <= 500 ? "xs" : "s"}
          onClick={onSave}
          view={'secondary'}
        />
      </div>
    </div>
  );
};

export default DeviceCreateRatingModal;
