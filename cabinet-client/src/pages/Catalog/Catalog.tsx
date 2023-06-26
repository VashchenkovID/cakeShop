import React, { useEffect, useMemo, useState } from "react";
import useRequest from "../../hooks/useRequest";
import cakesApi from "../../api/requests/cakesApi";
import styles from "./Catalog.module.styl";
import cn from "classnames/bind";
import { TypeModel } from "../../api/models/TypeModel";
import { Text } from "@consta/uikit/Text";
import { DeviceListModel } from "../../api/models/DeviceListModel";
import PaginationCustom, {
  PaginationStateType,
} from "../../components/PaginationCustom/PaginationCustom";
import { useAppSelector } from "../../hooks/useAppSelector";
import { selectBasket } from "../../store/features/basket/BasketSelectors";
import { useNavigate } from "react-router-dom";
import IconBasket from "../../components/IconBasket/IconBasket";
import { PublicRoutesEnum } from "../../utils/enum";
import CatalogItem from "./CatalogItem/CatalogItem";
import { Tabs } from "@consta/uikit/Tabs";
import { Loader } from "@consta/uikit/Loader";
import InformerBadge from "../../components/Informer/Informer";
import { Pagination } from "@consta/uikit/Pagination";

const cx = cn.bind(styles);
const Catalog: React.FC = () => {
  const basket = useAppSelector(selectBasket);
  const navigate = useNavigate();
  const [type, setType] = useState<TypeModel | undefined>({
    id: undefined,
    name: "Все",
    createdAt: "",
    updatedAt: "",
  });
  const [types, setTypes] = useState<TypeModel[]>([
    {
      id: undefined,
      name: "Все",
      createdAt: "",
      updatedAt: "",
    },
  ]);
  const [items, setItems] = useState<DeviceListModel[]>([]);
  const [pagination, setPagination] = useState<PaginationStateType>({
    page: 1,
    perPage: 10,
  });
  const [count, setCount] = useState(0);

  const hotKeys = {
    prevPage: {
      label: "← Shift",
      values: ["Shift", "ArrowLeft"],
    },
    nextPage: {
      label: "Shift →",
      values: ["Shift", "ArrowRight"],
    },
  };

  const handleChange = (pageNumber: number): void => {
    if (pageNumber === 0) {
      setPagination((prevState) => {
        return { ...prevState, page: 1 };
      });
    } else {
      setPagination((prevState) => {
        return { ...prevState, page: pageNumber };
      });
    }
  };

  const { load: fetchTypes, isLoading: typeLoading } = useRequest(
    cakesApi.getCakeTypes,
    (data) => {
      if (data) {
        setTypes((prev) => {
          return [
            {
              id: undefined,
              name: "Все",
              createdAt: "",
              updatedAt: "",
            },
            ...data.data,
          ];
        });
      }
    }
  );
  const { load: fetchRecipes, isLoading } = useRequest(
    cakesApi.loadAllCakes,
    (data) => {
      if (data) {
        setItems(data.data.rows);
        setCount(data.data.count);
      }
    }
  );
  const isBasketVisible = useMemo(() => {
    return basket && basket.items.length > 0;
  }, [basket]);

  const totalPages = useMemo(() => {
    if (count > 10) {
      return Math.round(count / 10);
    } else return 1;
  }, [count]);

  useEffect(() => {
    fetchTypes();
  }, []);

  useEffect(() => {
    if (type) {
      fetchRecipes({
        typeId: type.id,
        page: pagination.page,
        limit: pagination.perPage,
      });
    } else {
      fetchRecipes({
        typeId: undefined,
        page: pagination.page,
        limit: pagination.perPage,
      });
    }
  }, [pagination, type]);
  return (
    <div className={styles.Shop}>
      <div className={styles.Shop__header}>
        <Tabs
          getItemLabel={(i) => i.name}
          items={types}
          value={type}
          onChange={({ value }) => setType(value)}
          fitMode="scroll"
          view={"clear"}
        />
      </div>
      {!isLoading ? (
        <div className={styles.Shop__items}>
          {items.length > 0 &&
            items.map((item, index) => (
              <CatalogItem item={item} key={`${item.id}_${index}`} />
            ))}
        </div>
      ) : (
        <div className={styles.Shop__loader}>
          <Loader />
        </div>
      )}
      {!isLoading && items.length === 0 && (
        <InformerBadge text={"Список пуст"} />
      )}
      <div
        className={cx(styles.IconBasket, {
          visible: isBasketVisible,
        })}
        onClick={() => navigate(`${PublicRoutesEnum.VIEW_ORDER}/${PublicRoutesEnum.CREATE_ORDER}`)}
      >
        <IconBasket className={styles.IconBasket__icon} />
      </div>

      <footer>
        <Pagination
          className={styles.Shop__active}
          currentPage={pagination.page}
          onChange={handleChange}
          totalPages={totalPages}
        />
      </footer>
    </div>
  );
};

export default Catalog;
