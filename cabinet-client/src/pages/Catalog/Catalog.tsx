import React, { useEffect, useMemo, useState } from "react";
import useRequest from "../../hooks/useRequest";
import cakesApi, { CakesReqType } from "../../api/requests/cakesApi";
import styles from "./Catalog.module.styl";
import cn from "classnames/bind";
import { TypeModel } from "src/api/models/TypeModel";
import { DeviceListModel } from "src/api/models/DeviceListModel";
import { PaginationStateType } from "src/components/PaginationCustom/PaginationCustom";
import { useAppSelector } from "src/hooks/useAppSelector";
import { selectBasket } from "src/store/features/basket/BasketSelectors";
import { useNavigate, useSearchParams } from "react-router-dom";
import IconBasket from "../../components/IconBasket/IconBasket";
import { LocalStorageKeysEnum, PublicRoutesEnum } from "src/utils/enum";
import CatalogItem from "./CatalogItem/CatalogItem";
import { Tabs } from "@consta/uikit/Tabs";
import { Loader } from "@consta/uikit/Loader";
import InformerBadge from "../../components/Informer/Informer";
import { Pagination } from "@consta/uikit/Pagination";
import { Modal } from "@consta/uikit/Modal";
import CatalogBuyOneClickModal from "./CatalogBuyOneClickModal/CatalogBuyOneClickModal";
import { useResize } from "src/hooks/useResize";

const cx = cn.bind(styles);
const Catalog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { width } = useResize();
  const basket = useAppSelector(selectBasket);
  const navigate = useNavigate();

  const initialType = () => {
    const localType = localStorage.getItem(LocalStorageKeysEnum.DESSERT_TYPE);
    if (localType) {
      return JSON.parse(localType) as TypeModel;
    } else {
      return {
        id: undefined,
        name: "Все",
        createdAt: "",
        updatedAt: "",
      };
    }
  };

  const [type, setType] = useState<TypeModel | undefined>(initialType());
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
  const [modal, setModal] = useState(false);
  //pagination

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
        if (watchSearchParamsWithFilters.typeId) {
          setType(
            data.data.find(
              (d) => d.id === Number(watchSearchParamsWithFilters.typeId)
            )
          );
        }
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

  const watchSearchParamsWithFilters = useMemo(() => {
    let result: { [key: string]: string } = {};
    for (const entry of searchParams.entries()) {
      const [param, value] = entry;
      result = { ...result, [param]: value };
    }
    return result;
  }, [searchParams]);

  useEffect(() => {
    fetchTypes();
  }, []);

  useEffect(() => {
    fetchRecipes(watchSearchParamsWithFilters as CakesReqType);
  }, [searchParams]);
  useEffect(() => {
    const newParams: { [key: string]: string } = {
      page: pagination.page.toString(),
      limit: pagination.perPage.toString(),
    };
    if (type?.id) {
      newParams.typeId = type.id.toString();
    }
    setSearchParams(newParams, { replace: true });
  }, [pagination, type]);

  useEffect(() => {
    return () => {
      localStorage.removeItem(LocalStorageKeysEnum.DESSERT_TYPE);
    };
  }, []);
  return (
    <div className={styles.Shop}>
      <div className={styles.Shop__header}>
        <Tabs
          size={"s"}
          getItemLabel={(i) => i.name}
          items={types}
          value={type}
          onChange={({ value }) => setType(value)}
          fitMode="scroll"
          view={"clear"}
        />
      </div>
      {items.length > 0 && (
        <div className={styles.Shop__items}>
          {items.map((item, index) => (
            <CatalogItem
              setModal={setModal}
              item={item}
              key={`${item.id}_${index}`}
              width={width}
            />
          ))}
        </div>
      )}
      {isLoading && (
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
        onClick={() =>
          navigate(
            `${PublicRoutesEnum.VIEW_ORDER}/${PublicRoutesEnum.CREATE_ORDER}`
          )
        }
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
      <Modal isOpen={modal}>
        <CatalogBuyOneClickModal
          modal={modal}
          setModal={setModal}
          width={width}
        />
      </Modal>
    </div>
  );
};

export default Catalog;
