import React, { useEffect, useState } from "react";
import { EntityModel } from "src/api/models/EntityModel";
import useRequest from "src/hooks/useRequest";
import entitiesApi from "src/api/requests/entitiesApi";
import { Text } from "@consta/uikit/Text";
import { Button } from "@consta/uikit/Button";
import { Select } from "@consta/uikit/Select";
import { IconClose } from "@consta/uikit/IconClose";
import StarRating from "src/components/StarRating/StarRating";
import { TextField } from "@consta/uikit/TextField";
import ratingsApi, { CreateRatingReqBody } from "src/api/requests/ratingsApi";
import styles from "./FeedbackCreateRatingModal.module.styl";

interface IComponentProps {
  onClose(): void;
  width: number;
  refetch(): void;
}

const FeedbackCreateRatingModal: React.FC<IComponentProps> = ({
  onClose,
  width,
  refetch,
}) => {
  const [device, setDevice] = useState<EntityModel | null>(null);
  const [modalState, setModalState] = useState<CreateRatingReqBody>({
    rating: 0,
    ratingComment: "",
    device_id: device?.id.toString() || "",
  });
  const onSave = async () => {
    if (device) {
      await ratingsApi
        .createRating({
          device_id: device.id.toString(),
          rating: modalState.rating,
          ratingComment: modalState.ratingComment,
        })
        .then((r) => {
          if (r.data) {
            refetch();
            onClose();
          }
        });
    }
  };
  const {
    load: fetchItems,
    isLoading,
    data: devices,
  } = useRequest(entitiesApi.getDevices);

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className={styles.Modal}>
      <div className={styles.Modal__header}>
        <Text view={"brand"} size={'2xl'}>Создание отзыва</Text>
        <Button
          size={width >= 500 ? "m" : "s"}
          iconLeft={IconClose}
          onClick={onClose}
          view={'clear'}
        />
      </div>
      <Select
          className={styles.label}
        isLoading={isLoading}
        form={'round'}
        label={"Десерт"}
        placeholder={"Выберите десерт"}
        items={devices?.data || []}
        value={device}
        getItemLabel={(i) => i.name}
        getItemKey={(i) => i.id}
        onChange={({ value }) => setDevice(value)}
      />
      <div>
        <div>
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
            className={styles.label}
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

      <div className={styles.Modal__footer}>
        <Button
          label={"Отменить"}
          size={width <= 500 ? "xs" : "s"}
          onClick={onClose}
        />
        <Button
          label={"Создать"}
          size={width <= 500 ? "xs" : "s"}
          onClick={onSave}
          disabled={modalState.rating === 0 || !device}
        />
      </div>
    </div>
  );
};

export default FeedbackCreateRatingModal;
