import React from "react";
import ComponentStyleWrapper from "../../../components/ComponentStyleWrapper/ComponentStyleWrapper";
import styles from "../DeviceView.module.styl";
import { User } from "@consta/uikit/User";
import StarRating from "../../../components/StarRating/StarRating";
import Textarea from "../../../components/Textarea/Textarea";
import { RatingItemModel } from "src/api/models/RatingItemModel";
import { Text } from "@consta/uikit/Text";
import { IconFavorite } from "@consta/uikit/IconFavorite";

interface IComponentProps {
  item: RatingItemModel;
  width: number;
}

const DeviceViewRightSideItem: React.FC<IComponentProps> = ({
  item,
  width,
}) => {
  return (
    <ComponentStyleWrapper key={item.id}>
      <div className={styles.Device__rightSide__item}>
        <div className={styles.Device__rightSide__item__header}>
          <User name={item.user} />
          {width <= 500 ? (
            <div className={styles.Device__rightSide__item__mobile}>
              <Text size={"s"}>{item.rating}</Text>
              <IconFavorite
                className={styles.Device__rightSide__item__mobile__star}
              />
            </div>
          ) : (
            <StarRating rating={Number(item.rating)} readonly />
          )}
        </div>
        <Textarea
          className={styles.Device__rightSide__item__textarea}
          text={item.ratingComment}
          size={width <= 500 ? "xs" : "s"}
        />
      </div>
    </ComponentStyleWrapper>
  );
};

export default DeviceViewRightSideItem;
