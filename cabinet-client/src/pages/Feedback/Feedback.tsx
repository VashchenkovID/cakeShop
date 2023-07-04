import React, { useEffect, useState } from "react";
import { RatingItemModel } from "src/api/models/RatingItemModel";
import useRequest from "src/hooks/useRequest";
import ratingsApi from "src/api/requests/ratingsApi";
import { PaginationStateType } from "src/components/PaginationCustom/PaginationCustom";
import { useResize } from "src/hooks/useResize";
import ComponentStyleWrapper from "src/components/ComponentStyleWrapper/ComponentStyleWrapper";
import { Text } from "@consta/uikit/Text";

const Feedback: React.FC = () => {
  const { width } = useResize();
  const [ratings, setRatings] = useState<RatingItemModel[]>([]);
  const { load: fetchRatings, isLoading } = useRequest(
    ratingsApi.getUserRatings
  );
  const [pagination, setPagination] = useState<PaginationStateType>({
    page: 1,
    perPage: 100,
  });
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchRatings({ limit: pagination.perPage, page: pagination.page });
  }, [pagination]);

  return (
    <div>
      <ComponentStyleWrapper>
        <Text size={"3xl"}>Мои отзывы</Text>
        <div></div>
      </ComponentStyleWrapper>
    </div>
  );
};

export default Feedback;
