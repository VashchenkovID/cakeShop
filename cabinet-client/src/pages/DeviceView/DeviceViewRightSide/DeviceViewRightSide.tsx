import React from "react";
import { RatingItemModel } from "../../../api/models/RatingItemModel";
import { Text } from "@consta/uikit/Text";
import { User } from "@consta/uikit/User";
import StarRating from "../../../components/StarRating/StarRating";
import Textarea from "../../../components/Textarea/Textarea";
import ComponentStyleWrapper from "../../../components/ComponentStyleWrapper/ComponentStyleWrapper";
import styles from "../DeviceView.module.styl";
import { Button } from "@consta/uikit/Button";

interface IComponentProps {
  setPagination: React.Dispatch<
    React.SetStateAction<{ page: number; limit: number }>
  >;
  ratings: RatingItemModel[];
  count: number;
}

const DeviceViewRightSide: React.FC<IComponentProps> = ({
  ratings,
  count,
  setPagination,
}) => {
  return (
    <ComponentStyleWrapper>
      <div className={styles.Device__rightSide}>
        <Text size={"2xl"}>Отзывы покупателей</Text>
        <div className={styles.Device__rightSide__items}>
          {ratings.length > 0 &&
            ratings.map((item, index) => (
              <ComponentStyleWrapper key={item.id}>
                <div className={styles.Device__rightSide__item}>
                  <div className={styles.Device__rightSide__item__header}>
                    <User name={item.user} />
                    <StarRating rating={Number(item.rating)} readonly />
                  </div>
                  <Textarea
                    className={styles.Device__rightSide__item__textarea}
                    text={item.ratingComment}
                  />
                </div>
              </ComponentStyleWrapper>
            ))}
        </div>
        <div className={styles.Device__rightSide__action}>
          <Button
            label={"Загрузить еще"}
            size={'s'}
            onClick={() =>
              setPagination((prevState) => {
                return { ...prevState, limit: prevState.limit + 10 };
              })
            }
          />
        </div>
      </div>
    </ComponentStyleWrapper>
  );
};

export default DeviceViewRightSide;
