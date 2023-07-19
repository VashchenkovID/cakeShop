import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useRequest from "../../hooks/useRequest";
import cakesApi from "../../api/requests/cakesApi";
import ratingsApi from "../../api/requests/ratingsApi";
import { RatingItemModel } from "src/api/models/RatingItemModel";
import styles from "./DeviceView.module.styl";
import cn from "classnames/bind";
import { useResize } from "src/hooks/useResize";
import DeviceViewLeftSide from "./DeviceViewLeftSide/DeviceViewLeftSide";
import { PublicRoutesEnum } from "src/utils/enum";
import IconBasket from "../../components/IconBasket/IconBasket";
import { useAppSelector } from "src/hooks/useAppSelector";
import { selectBasket } from "src/store/features/basket/BasketSelectors";
import DeviceViewRightSide from "./DeviceViewRightSide/DeviceViewRightSide";
import TransitionWrapper from "src/components/TransitionWrapper/TransitionWrapper";

const cx = cn.bind(styles);
const DeviceView: React.FC = () => {
  const params = useParams();
  const basket = useAppSelector(selectBasket);
  const navigate = useNavigate();
  const { width } = useResize();
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });
  const [ratings, setRatings] = useState<RatingItemModel[]>([]);
  const [count, setCount] = useState(0);
  const {
    load: fetchDevice,
    data: device,
    isLoading,
  } = useRequest(cakesApi.loadOneCake);

  const { load: fetchDeviceRatings, isLoading: isLoadingRatings } = useRequest(
    ratingsApi.getDeviceRatings,
    (data) => {
      if (data) {
        setRatings(data.data.rows);
        setCount(data.data.count);
      }
    }
  );

  const isBasketVisible = useMemo(() => {
    return basket && basket.items.length > 0;
  }, [basket]);

  useEffect(() => {
    if (params.id) {
      fetchDevice(params.id);
    }
  }, [params]);
  useEffect(() => {
    if (params.id) {
      fetchDeviceRatings({
        device_id: params.id,
        limit: pagination.limit,
        page: pagination.page,
      });
    }
  }, [params, pagination]);

  return (
    <TransitionWrapper>
      <section>
        {" "}
        {!isLoading && (
          <div className={styles.Device}>
            {device?.data && (
              <div>
                <DeviceViewLeftSide
                  device={device.data}
                  width={width}
                  fetchRatings={fetchDeviceRatings}
                  fetchDevice={fetchDevice}
                />
              </div>
            )}
            <DeviceViewRightSide
              isLoading={isLoadingRatings}
              width={width}
              setPagination={setPagination}
              ratings={ratings}
              count={count}
            />
          </div>
        )}
        <div
          className={cx(styles.IconBasket, {
            visible: isBasketVisible,
          })}
          onClick={() =>
            navigate(
              `${PublicRoutesEnum.VIEW_ORDER}/${PublicRoutesEnum.CREATE_ORDER}`
            )
          }
        >
          <IconBasket className={styles.IconBasket__icon} />
        </div>
      </section>
    </TransitionWrapper>
  );
};

export default DeviceView;
