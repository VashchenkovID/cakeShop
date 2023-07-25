import React, { useEffect, useState } from "react";
import useRequest from "src/hooks/useRequest";
import cakesApi from "src/api/requests/cakesApi";
import styles from "./AdministrationTypes.module.styl";
import AdministrationTypesSection from "src/pages/AdministrationTypes/AdministrationTypesSection/AdministrationTypesSection";
import AdministrationTypesModalList from "src/pages/AdministrationTypes/AdministrationTypeModals/AdministrationTypesModalList";
import MainWrapper from "src/components/MainWrapper/MainWrapper";
import { toast } from "react-toastify";

export enum AdministrationTypesModalEnum {
  IDLE = "idle",
  FILLING = "filling",
  TYPE = "type",
  BISCUIT = "biscuit",
  DECOR = "decor",
  TYPE_EDIT = "typeEdit",
  FILLING_EDIT = "fillingEdit",
  BISCUIT_EDIT = "biscuitEdit",
  DECOR_EDIT = "decorEdit",
  TYPE_REMOVE = "typeRemove",
  FILLING_REMOVE = "fillingRemove",
  BISCUIT_REMOVE = "biscuitRemove",
  DECOR_REMOVE = "decorRemove",
}

export enum AdministrationTypesItemsEnum {
  TYPE = "type",
  FILLING = "filling",
  BISCUIT = "biscuit",
  DECOR = "decor",
}

export interface AdministrationTypesItemWithImg {
  id: number | null;
  name: string;
  img: any;
}
export interface AdministrationTypesDecorItem {
  id: number | null;
  name: string;
  count: number;
  countType: string;
  pricePerUnit: string;
  constPrice: string;
}

const AdministrationTypes: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [types, setTypes] = useState<{ id: number; name: string }[]>([]);
  const [fillings, setFillings] = useState<AdministrationTypesItemWithImg[]>(
    []
  );
  const [biscuits, setBiscuits] = useState<AdministrationTypesItemWithImg[]>(
    []
  );
  const [decors, setDecors] = useState<AdministrationTypesDecorItem[]>([]);
  const [modal, setModal] = useState(AdministrationTypesModalEnum.IDLE);
  const [type, setType] = useState<{ id: number | null; name: string }>({
    id: null,
    name: "",
  });
  const [filling, setFilling] = useState<AdministrationTypesItemWithImg>({
    id: null,
    name: "",
    img: null,
  });
  const [biscuit, setBiscuit] = useState<AdministrationTypesItemWithImg>({
    id: null,
    name: "",
    img: null,
  });
  const [decor, setDecor] = useState<AdministrationTypesDecorItem>({
    id: null,
    name: "",
    count: 0,
    countType: "",
    pricePerUnit: "",
    constPrice: "",
  });
  const clear = () => {
    setType({ name: "", id: null });
    setFilling({
      id: null,
      name: "",
      img: null,
    });
    setBiscuit({
      id: null,
      name: "",
      img: null,
    });
    setDecor({
      id: null,
      name: "",
      count: 0,
      countType: "",
      pricePerUnit: "",
      constPrice: "",
    });
  };

  const { load: fetchTypes } = useRequest(cakesApi.getCakeTypes, (data) => {
    if (data) {
      setTypes(data.data);
    }
  });

  const { load: fetchFillings } = useRequest(
    cakesApi.getCakeFillings,
    (data) => {
      if (data) {
        setFillings(data.data);
      }
    }
  );

  const { load: fetchBiscuits } = useRequest(cakesApi.getBiscuits, (data) => {
    if (data) {
      setBiscuits(data.data);
    }
  });

  const { load: fetchDecors } = useRequest(cakesApi.getDecorAdmin, (data) => {
    if (data) {
      setDecors(data.data);
    }
  });

  const setEdit = (type: AdministrationTypesItemsEnum, item: any) => {
    switch (type) {
      case AdministrationTypesItemsEnum.TYPE:
        setType({ ...item });
        return;
      case AdministrationTypesItemsEnum.FILLING:
        setFilling({ ...item });
        return;
      case AdministrationTypesItemsEnum.BISCUIT:
        setBiscuit({ ...item });
        return;
      case AdministrationTypesItemsEnum.DECOR:
        setDecor({ ...item });
        return;
      default:
        clear();
        return;
    }
  };

  const refreshPage = () => {
    fetchTypes();
    fetchFillings();
    fetchBiscuits();
    fetchDecors();
  };

  useEffect(() => {
    fetchTypes();
    fetchFillings();
    fetchBiscuits();
    fetchDecors();
  }, []);

  return (
    <MainWrapper title={"Справочники"}>
      <div className={styles.Types}>
        <div className={styles.Types__column}>
          <AdministrationTypesSection
            clear={clear}
            title={"Типы десертов"}
            items={types}
            isDecor={false}
            onCreate={() => setModal(AdministrationTypesModalEnum.TYPE)}
            type={AdministrationTypesItemsEnum.TYPE}
            setEdit={setEdit}
            setModal={setModal}
          />
        </div>
        <div className={styles.Types__column}>
          <AdministrationTypesSection
            clear={clear}
            title={"Типы начинки"}
            items={fillings}
            isDecor={false}
            onCreate={() => setModal(AdministrationTypesModalEnum.FILLING)}
            type={AdministrationTypesItemsEnum.FILLING}
            setEdit={setEdit}
            setModal={setModal}
          />
        </div>
        <div className={styles.Types__column}>
          <AdministrationTypesSection
            clear={clear}
            title={"Типы бисквита"}
            items={biscuits}
            isDecor={false}
            onCreate={() => setModal(AdministrationTypesModalEnum.BISCUIT)}
            type={AdministrationTypesItemsEnum.BISCUIT}
            setEdit={setEdit}
            setModal={setModal}
          />
        </div>
        <div className={styles.Types__column}>
          <AdministrationTypesSection
            clear={clear}
            onCreate={() => setModal(AdministrationTypesModalEnum.DECOR)}
            title={"Декор"}
            items={decors}
            isDecor
            type={AdministrationTypesItemsEnum.DECOR}
            setEdit={setEdit}
            setModal={setModal}
          />
        </div>
      </div>
      <AdministrationTypesModalList
        type={type}
        setType={setType}
        modal={modal}
        setModal={setModal}
        filling={filling}
        setFilling={setFilling}
        biscuit={biscuit}
        setBiscuit={setBiscuit}
        decor={decor}
        setDecor={setDecor}
        types={types}
        clear={clear}
        refreshPage={refreshPage}
      />
    </MainWrapper>
  );
};


export default AdministrationTypes;
