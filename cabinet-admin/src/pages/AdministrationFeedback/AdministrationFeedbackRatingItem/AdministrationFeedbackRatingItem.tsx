import React from 'react';
import { RatingItemModel } from 'src/api/models/RatingItemModel';
import { User } from '@consta/uikit/User';
import StarRating from 'src/components/StarRating/StarRating';
import Textarea from 'src/components/Textarea/Textarea';
import styles from './AdministrationFeedbackRatingItem.module.styl';

interface IComponentProps {
  item: RatingItemModel;
}

const AdministrationFeedbackRatingItem: React.FC<IComponentProps> = ({
  item,
}) => {
  return (
    <div className={styles.Rating}>
      <div className={styles.Rating__header}>
        <User
          name={item.user}
          info={new Date(item.createdAt).toLocaleDateString()}
        />
        <StarRating rating={Number(item.rating)} readonly />
      </div>
      <Textarea text={item.ratingComment || 'Пользователь не оставил комментарий'} />
    </div>
  );
};

export default AdministrationFeedbackRatingItem;
