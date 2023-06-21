import React, { useEffect, useState } from 'react';
import useRequest from 'src/hooks/useRequest';
import cakesApi from 'src/api/requests/cakesApi';
import styles from './AdministrationTypes.styl';
import AdministrationTypesSection from 'src/pages/AdministrationTypes/AdministrationTypesSection/AdministrationTypesSection';
import AdministrationTypesModalList from 'src/pages/AdministrationTypes/AdministrationTypeModals/AdministrationTypesModalList';
import MainWrapper from 'src/components/MainWrapper/MainWrapper';

export enum AdministrationTypesModalEnum {
  IDLE = 'idle',
  FILLING = 'filling',
  TYPE = 'type',
  BISCUIT = 'biscuit',
  DECOR = 'decor',
  TYPE_EDIT = 'typeEdit',
  FILLING_EDIT = 'fillingEdit',
  BISCUIT_EDIT = 'biscuitEdit',
  DECOR_EDIT = 'decorEdit',
  TYPE_REMOVE = 'typeRemove',
  FILLING_REMOVE = 'fillingRemove',
  BISCUIT_REMOVE = 'biscuitRemove',
  DECOR_REMOVE = 'decorRemove',
}

export enum AdministrationTypesItemsEnum {
  TYPE = 'type',
  FILLING = 'filling',
  BISCUIT = 'biscuit',
  DECOR = 'decor',
}

export interface AdministrationTypesItemWithImg {
  id: number | null;
  name: string;
  img: string | null;
}
export interface AdministrationTypesDecorItem {
  id: number | null;
  name: string;
  count: number;
  countType: string;
  pricePerUnit: number;
  constPrice: number;
}

const AdministrationTypes: React.FC = () => {
  const [types, setTypes] = useState<{ id: number; name: string }[]>([]);
  const [fillings, setFillings] = useState<AdministrationTypesItemWithImg[]>(
    [],
  );
  const [biscuits, setBiscuits] = useState<AdministrationTypesItemWithImg[]>(
    [],
  );
  const [decors, setDecors] = useState<AdministrationTypesDecorItem[]>([]);
  const [modal, setModal] = useState(AdministrationTypesModalEnum.IDLE);
  const [type, setType] = useState<{ id: number | null; name: string }>({
    id: null,
    name: '',
  });
  const [filling, setFilling] = useState<AdministrationTypesItemWithImg>({
    id: null,
    name: '',
    img: null,
  });
  const [biscuit, setBiscuit] = useState<AdministrationTypesItemWithImg>({
    id: null,
    name: '',
    img: null,
  });
  const [decor, setDecor] = useState<AdministrationTypesDecorItem>({
    id: null,
    name: '',
    count: 0,
    countType: '',
    pricePerUnit: 0,
    constPrice: 0,
  });
  const clear = () => {
    setType({ name: '', id: null });
    setFilling({
      id: null,
      name: '',
      img: null,
    });
    setBiscuit({
      id: null,
      name: '',
      img: null,
    });
    setDecor({
      id: null,
      name: '',
      count: 0,
      countType: '',
      pricePerUnit: 0,
      constPrice: 0,
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
    },
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

  const createNewType = async () => {
    if (type.name !== '') {
      const data = new FormData();
      data.append('name', type.name);
      await cakesApi
        .createCakeType(data)
        .then(() => {
          fetchTypes();
        })
        .then(() => clear());
    }
  };
  const updateType = async () => {
    if (type.id && type.name !== '') {
      await cakesApi
        .updateCakeType(type.id, type.name)
        .then(() => {
          fetchTypes();
        })
        .then(() => clear());
    }
  };
  const removeType = async () => {
    if (type.id) {
      await cakesApi.removeCakeType(type.id).then(() => {
        fetchTypes();
        clear();
      });
    }
  };

  const createNewFilling = async () => {
    if (filling.name !== '') {
      const data = new FormData();
      data.append('name', filling.name);
      data.append('img', filling.img);
      await cakesApi.createCakeFilling(data).then(() => {
        fetchFillings();
        clear();
      });
    }
  };
  const updateFilling = async () => {
    if (filling.id && filling.name !== '') {
      const data = new FormData();
      data.append('name', filling.name);
      data.append('img', filling.img);
      await cakesApi.updateCakeFilling(filling.id, data).then(() => {
        fetchFillings();
        clear();
      });
    }
  };
  const removeFilling = async () => {
    if (filling.id) {
      await cakesApi.removeCakeFilling(filling.id).then(() => {
        fetchFillings();
        clear();
      });
    }
  };

  const createNewBiscuit = async () => {
    if (biscuit.name !== '') {
      const data = new FormData();
      data.append('name', biscuit.name);
      data.append('img', biscuit.img);
      await cakesApi.createBiscuit(data).then(() => {
        fetchBiscuits();
        clear();
      });
    }
  };

  const updateBiscuit = async () => {
    if (biscuit.id && biscuit.name !== '') {
      const data = new FormData();
      data.append('name', biscuit.name);
      data.append('img', biscuit.img);
      await cakesApi.updateBiscuit(biscuit.id, data).then(() => {
        fetchBiscuits();
        clear();
      });
    }
  };
  const removeBiscuit = async () => {
    if (biscuit.id) {
      await cakesApi.removeBiscuit(biscuit.id).then(() => {
        fetchBiscuits();
        clear();
      });
    }
  };

  const createNewDecor = async () => {
    if (
      decor.name !== '' &&
      decor.countType !== '' &&
      decor.count !== 0 &&
      decor.pricePerUnit !== 0 &&
      decor.constPrice !== 0
    ) {
      const data = new FormData();
      data.append('name', decor.name);
      data.append('countType', decor.countType);
      data.append('count', decor.count.toString());
      data.append('pricePerUnit', decor.pricePerUnit.toString());
      data.append('constPrice', decor.constPrice.toString());
      await cakesApi.createDecor(data).then(() => {
        fetchDecors();
        clear();
      });
    }
  };

  const updateDecor = async () => {
    if (
      decor.id &&
      decor.name !== '' &&
      decor.countType !== '' &&
      decor.count !== 0 &&
      decor.pricePerUnit !== 0 &&
      decor.constPrice !== 0
    ) {
      const data = new FormData();
      data.append('name', decor.name);
      data.append('countType', decor.countType);
      data.append('count', decor.count.toString());
      data.append('pricePerUnit', decor.pricePerUnit.toString());
      data.append('constPrice', decor.constPrice.toString());
      await cakesApi.updateDecor(decor.id, data).then(() => {
        fetchDecors();
        clear();
      });
    }
  };

  const removeDecor = async () => {
    if (decor.id) {
      await cakesApi.removeDecor(decor.id).then(() => {
        fetchDecors();
        clear();
      });
    }
  };
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

  useEffect(() => {
    fetchTypes();
    fetchFillings();
    fetchBiscuits();
    fetchDecors();
  }, []);

  return (
    <MainWrapper title={'Справочники'}>
      <div className={styles.Types}>
        <div className={styles.Types__column}>
          <AdministrationTypesSection
            clear={clear}
            title={'Типы десертов'}
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
            title={'Типы начинки'}
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
            title={'Типы бисквита'}
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
            title={'Декор'}
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
        fillings={fillings}
        biscuits={biscuits}
        decors={decors}
        createNewType={createNewType}
        createNewFilling={createNewFilling}
        createNewBiscuit={createNewBiscuit}
        createNewDecor={createNewDecor}
        removeBiscuit={removeBiscuit}
        removeDecor={removeDecor}
        removeFilling={removeFilling}
        removeType={removeType}
        updateBiscuit={updateBiscuit}
        updateDecor={updateDecor}
        updateFilling={updateFilling}
        updateType={updateType}
      />
    </MainWrapper>
  );
};

export default AdministrationTypes;
