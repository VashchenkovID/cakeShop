import React from "react";
import { RatingItemModel } from "src/api/models/RatingItemModel";
import ComponentStyleWrapper from "src/components/ComponentStyleWrapper/ComponentStyleWrapper";
import { Text } from "@consta/uikit/Text";
import StarRating from "src/components/StarRating/StarRating";
import Textarea from "src/components/Textarea/Textarea";
import { IconFavorite } from "@consta/uikit/IconFavorite";
import styles from "./FeedbackItem.module.styl";

interface IComponentProps {
  rating: RatingItemModel;
  width: number;
}

const FeedbackItem: React.FC<IComponentProps> = ({ rating, width }) => {
  return (
    <ComponentStyleWrapper>
      <div className={styles.Item}>
        <div className={styles.Item__header}>
          <Text>{rating.deviceName || ""}</Text>
          {width >= 500 ? (
            <StarRating rating={Number(rating.rating)} readonly />
          ) : (
            <div className={styles.Item__mobileRating}>
              <Text size={"s"}>{rating.rating}</Text>
              <IconFavorite className={styles.Item__star} />
            </div>
          )}
        </div>
        {rating.ratingComment !== "" && (
          <Textarea text={rating.ratingComment} />
        )}
      </div>
    </ComponentStyleWrapper>
  );
};

export default FeedbackItem;
