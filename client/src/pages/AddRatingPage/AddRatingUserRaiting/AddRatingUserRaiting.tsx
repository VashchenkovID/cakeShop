import React from 'react';
import { UserRaitingListItem } from 'src/api/models/UserRaitingListItem';
import { User } from '@consta/uikit/User';
import { Text } from '@consta/uikit/Text';
import Textarea from 'src/components/Textarea/Textarea';
import { IconFavorite } from '@consta/uikit/IconFavorite';
import styles from './AddRatingUserRaiting.styl';

interface IComponentProps {
  item: UserRaitingListItem;
}

const AddRatingUserRaiting: React.FC<IComponentProps> = ({ item }) => {
  return (
    <div className={styles.AddRatingUserRaiting}>
      <div className={styles.AddRatingUserRaiting__header}>
        <User name={item.user} info={item.UserId ? 'Покупатель' : ''} />
        <div className={styles.AddRatingUserRaiting__header__rating}>
          <Text size={'l'}>{item.rating}</Text>
          <IconFavorite />
        </div>
      </div>
      {item.ratingComment?.length > 0 && (
        <Textarea size={'xs'} text={item.ratingComment} />
      )}
    </div>
  );
};

export default AddRatingUserRaiting;
