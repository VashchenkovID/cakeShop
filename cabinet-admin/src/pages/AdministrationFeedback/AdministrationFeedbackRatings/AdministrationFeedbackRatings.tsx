import React, { SetStateAction } from 'react';
import { Loader } from '@consta/uikit/Loader';
import { RatingItemModel } from 'src/api/models/RatingItemModel';
import AdministrationFeedbackRatingItem from 'src/pages/AdministrationFeedback/AdministrationFeedbackRatingItem/AdministrationFeedbackRatingItem';
import styles from './AdministrationFeedbackRatings.module.styl';
import InformerBadge from 'src/components/Informer/Informer';
import PaginationCustom, {
  PaginationStateType,
} from 'src/components/PaginationCustom/PaginationCustom';

interface IComponentProps {
  isLoading: boolean;
  ratings: RatingItemModel[];
  setLimit: React.Dispatch<SetStateAction<number>>;
  limit: number;
  activeItem: number | null;
  setPagination: React.Dispatch<React.SetStateAction<PaginationStateType>>;
  pagination: PaginationStateType;
}
const AdministrationFeedbackRatings: React.FC<IComponentProps> = ({
  ratings,
  isLoading,
  limit,
  activeItem,
  pagination,
  setPagination,
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
          {activeItem && ratings.length > 0 && (
            <PaginationCustom
              className={styles.Ratings__footer}
              total={limit}
              pagination={pagination}
              setPagination={setPagination}
            />
          )}
        </>
      )}
    </div>
  );
};

export default AdministrationFeedbackRatings;
