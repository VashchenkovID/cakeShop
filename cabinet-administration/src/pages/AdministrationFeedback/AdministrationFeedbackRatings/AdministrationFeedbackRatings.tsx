import React, { SetStateAction } from 'react';
import { Loader } from '@consta/uikit/Loader';
import { RatingItemModel } from 'src/api/models/RatingItemModel';
import AdministrationFeedbackRatingItem from 'src/pages/AdministrationFeedback/AdministrationFeedbackRatingItem/AdministrationFeedbackRatingItem';
import styles from './AdministrationFeedbackRatings.styl';
import { Select } from '@consta/uikit/Select';
import InformerBadge from 'src/components/Informer/Informer';

interface IComponentProps {
  isLoading: boolean;
  ratings: RatingItemModel[];
  setLimit: React.Dispatch<SetStateAction<number>>;
  limit: number;
  activeItem: number;
}
const selectItems = [10, 25, 100, 200];
const AdministrationFeedbackRatings: React.FC<IComponentProps> = ({
  ratings,
  isLoading,
  setLimit,
  limit,
  activeItem,
}) => {
  return (
    <div>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <div className={styles.Ratings}>
            {ratings.length > 0 &&
              ratings.map((rating, index) => (
                <AdministrationFeedbackRatingItem
                  item={rating}
                  key={`${rating.id}_${index}`}
                />
              ))}
            {activeItem && ratings.length === 0 && (
              <InformerBadge
                text={'Пользователи еще не оставили рейтинги на данное изделие'}
              />
            )}
            {!activeItem && (
              <InformerBadge text={'Выберите изделие из меню слева'} />
            )}
          </div>
          <Select
            className={styles.Ratings__footer}
            size={'s'}
            items={selectItems}
            getItemLabel={(i) => i.toString()}
            getItemKey={(item) => item}
            value={limit}
            onChange={(value) => setLimit(value.value)}
            label={'Количество отзывов'}
            labelPosition={'left'}
          />
        </>
      )}
    </div>
  );
};

export default AdministrationFeedbackRatings;
