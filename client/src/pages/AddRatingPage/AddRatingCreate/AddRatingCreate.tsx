import React, { useEffect, useState } from 'react';
import ratingsApi, { CreateRatingReqBody } from 'src/api/requests/ratingsApi';
import useRequest from 'src/hooks/useRequest';
import PaginationCustom, {
  PaginationStateType,
} from 'src/components/PaginationCustom/PaginationCustom';
import { Text } from '@consta/uikit/Text';
import { TextField } from '@consta/uikit/TextField';
import StarRating from 'src/components/StarRating/StarRating';
import styles from './AddRatingCreate.styl';
import { Button } from '@consta/uikit/Button';
import { Loader } from '@consta/uikit/Loader';
import { useNavigate } from 'react-router-dom';
import { PublicRoutesEnum } from 'src/router';
import { UserRaitingListItem } from 'src/api/models/UserRaitingListItem';
import AddRatingUserRaiting from 'src/pages/AddRatingPage/AddRatingUserRaiting/AddRatingUserRaiting';

interface IComponentProps {
  deviceId: number;
}

const AddRatingCreate: React.FC<IComponentProps> = ({ deviceId }) => {
  const navigate = useNavigate();
  const [createState, setCreateState] = useState<CreateRatingReqBody>({
    rating: 0,
    ratingComment: '',
    device_id: deviceId.toString(),
  });
  const [pagination, setPagination] = useState<PaginationStateType>({
    page: 1,
    perPage: 10,
  });
  const [total, setTotal] = useState(0);
  const [ratings, setRatings] = useState<UserRaitingListItem[]>([]);
  const { load: getDeviceRatings, isLoading: isRatingLoading } = useRequest(
    ratingsApi.getDeviceRatings,
    (data) => {
      if (data) {
        setTotal(data.data.count);
        setRatings(data.data.rows);
      }
    },
  );
  const { load: createDeviceRating, isLoading: isRatingCreateLoading } =
    useRequest(ratingsApi.createRating);
  useEffect(() => {
    if (deviceId) {
      getDeviceRatings({
        device_id: deviceId.toString(),
        limit: pagination.perPage,
        page: pagination.page,
      });
    }
  }, [deviceId, pagination.page, pagination.perPage]);

  const createNewRating = async () => {
    if (createState.rating !== 0) {
      await createDeviceRating({
        ...createState,
        device_id: deviceId.toString(),
      });
    } else alert('Поставьте рейтинг');
  };

  return (
    <div className={styles.AddRatingCreate}>
      <Text size={'3xl'}>Создание отзыва</Text>
      <div className={styles.AddRatingCreate__rating}>
        <Text size={'l'}>Ваша оценка</Text>
        <div className={styles.AddRatingCreate__rating__estimation}>
          <Text>{createState.rating}</Text>
          <StarRating
            rating={createState.rating}
            setRating={(value) =>
              setCreateState((prev) => {
                return { ...prev, rating: value };
              })
            }
          />
        </div>
      </div>
      <div>
        <TextField
          label={'Комментарий'}
          placeholder={'Напишите комментарий'}
          form={'round'}
          width={'full'}
          size={'s'}
          rows={10}
          cols={70}
          type={'textarea'}
          value={createState.ratingComment}
          onChange={({ value }) => {
            if (value) {
              setCreateState((prev) => {
                return { ...prev, ratingComment: value };
              });
            } else
              setCreateState((prev) => {
                return { ...prev, ratingComment: '' };
              });
          }}
        />
      </div>

      <Text size={'2xl'}>Отзывы других пользователей</Text>

      <div className={styles.AddRatingCreate__ratingsContainer}>
        {isRatingLoading && (
          <div className={styles.AddRatingCreate__informer}>
            <Loader />
          </div>
        )}
        {!isRatingLoading &&
          ratings.length > 0 &&
          ratings.map((rating, index) => (
            <AddRatingUserRaiting item={rating} key={index} />
          ))}
        {!isRatingLoading && ratings.length === 0 && (
          <Text
            className={styles.AddRatingCreate__informer}
            size={'xs'}
            view={'secondary'}
          >
            Пользователи еще не оставили отзыв на данный товар
          </Text>
        )}
      </div>
      {ratings.length > 0 && (
        <PaginationCustom
          total={total}
          pagination={pagination}
          setPagination={setPagination}
        />
      )}
      <footer className={styles.AddRatingCreate__footer}>
        <Button
          label={'Сохранить'}
          size={'s'}
          onClick={() => {
            createNewRating();
            navigate(`${PublicRoutesEnum.SHOP}`);
          }}
          loading={isRatingCreateLoading}
        />
      </footer>
    </div>
  );
};

export default AddRatingCreate;
