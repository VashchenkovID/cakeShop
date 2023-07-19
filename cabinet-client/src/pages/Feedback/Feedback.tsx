import React, { useEffect, useState } from "react";
import { RatingItemModel } from "src/api/models/RatingItemModel";
import useRequest from "src/hooks/useRequest";
import ratingsApi from "src/api/requests/ratingsApi";
import PaginationCustom, {
  PaginationStateType,
} from "src/components/PaginationCustom/PaginationCustom";
import { useResize } from "src/hooks/useResize";
import ComponentStyleWrapper from "src/components/ComponentStyleWrapper/ComponentStyleWrapper";
import { Text } from "@consta/uikit/Text";
import FeedbackItem from "src/pages/Feedback/FeedbackItem/FeedbackItem";
import styles from "./Feedback.module.styl";
import { Button } from "@consta/uikit/Button";
import { IconAdd } from "@consta/uikit/IconAdd";
import { Modal } from "@consta/uikit/Modal";
import FeedbackCreateRatingModal from "src/pages/Feedback/FeedbackCreateRatingModal/FeedbackCreateRatingModal";
import TransitionWrapper from "src/components/TransitionWrapper/TransitionWrapper";
const Feedback: React.FC = () => {
  const { width } = useResize();
  const [modal, setModal] = useState(false);
  const [ratings, setRatings] = useState<RatingItemModel[]>([]);
  const { load: fetchRatings, isLoading } = useRequest(
    ratingsApi.getUserRatings,
    (data) => {
      if (data) {
        setRatings(data.data.rows);
        setCount(data.data.count);
      }
    }
  );
  const [pagination, setPagination] = useState<PaginationStateType>({
    page: 1,
    perPage: 100,
  });
  const [count, setCount] = useState(0);

  const onClose = () => {
    setModal(false);
  };
  const refetch = () => {
    fetchRatings({ limit: pagination.perPage, page: pagination.page });
  };
  useEffect(() => {
    fetchRatings({ limit: pagination.perPage, page: pagination.page });
  }, [pagination]);
  return (
    <TransitionWrapper>
      <div className={styles.Feedback}>
        <ComponentStyleWrapper>
          <div className={styles.Feedback__body}>
            <div className={styles.Feedback__header}>
              <Text size={width <= 500 ? "l" : "3xl"}>Мои отзывы</Text>
              <Button
                label={"Новый отзыв"}
                iconLeft={IconAdd}
                size={width <= 800 ? "xs" : "s"}
                onClick={() => setModal(true)}
              />
            </div>

            <div className={styles.Feedback__rows}>
              {ratings.length > 0 &&
                !isLoading &&
                ratings.map((item) => (
                  <FeedbackItem rating={item} width={width} key={item.id} />
                ))}
            </div>
            <PaginationCustom
              total={count}
              pagination={pagination}
              setPagination={setPagination}
            />
          </div>
        </ComponentStyleWrapper>
        <Modal isOpen={modal}>
          <FeedbackCreateRatingModal
            width={width}
            onClose={onClose}
            refetch={refetch}
          />
        </Modal>
      </div>
    </TransitionWrapper>
  );
};

export default Feedback;
