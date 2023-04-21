import React, { useEffect, useState } from 'react';
import useRequest from 'src/hooks/useRequest';
import cakesApi from 'src/api/requests/cakesApi';
import AdministrationTypesModalsType from 'src/pages/AdministrationPage/AdministrationTypeModals/AdministrationTypesModalsType';
import AdministrationTypesModalsFilling from 'src/pages/AdministrationPage/AdministrationTypeModals/AdministrationTypesModalsFilling';
import styles from './AdministrationTypes.styl';
import { Modal } from '@consta/uikit/Modal';
import AdministrationTypesSection from 'src/pages/AdministrationPage/AdministrationTypesSection/AdministrationTypesSection';
import AdministrationTypesModalsBiscuit from 'src/pages/AdministrationPage/AdministrationTypeModals/AdministrationTypesModalsBiscuit';
import AdministrationTypesModalsDecor from 'src/pages/AdministrationPage/AdministrationTypeModals/AdministrationTypesModalsDecor';

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

const AdministrationTypes: React.FC = () => {
  const [types, setTypes] = useState([]);
  const [fillings, setFillings] = useState([]);
  const [biscuits, setBiscuits] = useState([]);
  const [decors, setDecors] = useState([]);
  const [modal, setModal] = useState(AdministrationTypesModalEnum.IDLE);
  const [type, setType] = useState({ name: '' });
  const [filling, setFilling] = useState({
    name: '',
    img: null,
  });
  const [biscuit, setBiscuit] = useState({
    name: '',
    img: null,
  });
  const [decor, setDecor] = useState({
    name: '',
    count: 0,
    countType: '',
    pricePerUnit: 0,
    constPrice: 0,
  });
  const clear = () => {
    setType({ name: '' });
    setFilling({
      name: '',
      img: null,
    });
    setBiscuit({
      name: '',
      img: null,
    });
    setDecor({
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
    <section>
      <div className={styles.Types}>
        <div className={styles.Types__column}>
          <AdministrationTypesSection
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

      <Modal
        isOpen={modal === AdministrationTypesModalEnum.TYPE}
        onClickOutside={() => {
          setModal(AdministrationTypesModalEnum.IDLE);
        }}
      >
        <AdministrationTypesModalsType
          type={type}
          setType={setType}
          onClose={() => setModal(AdministrationTypesModalEnum.IDLE)}
          onSave={createNewType}
        />
      </Modal>
      <Modal
        onClickOutside={() => {
          setModal(AdministrationTypesModalEnum.IDLE);
        }}
        isOpen={modal === AdministrationTypesModalEnum.FILLING}
      >
        <AdministrationTypesModalsFilling
          filling={filling}
          setFilling={setFilling}
          onClose={() => setModal(AdministrationTypesModalEnum.IDLE)}
          onSave={createNewFilling}
        />
      </Modal>
      <Modal
        onClickOutside={() => {
          setModal(AdministrationTypesModalEnum.IDLE);
        }}
        className={styles.Modal}
        isOpen={modal === AdministrationTypesModalEnum.BISCUIT}
      >
        <AdministrationTypesModalsBiscuit
          biscuit={biscuit}
          setBiscuit={setBiscuit}
          onClose={() => setModal(AdministrationTypesModalEnum.IDLE)}
          onSave={createNewBiscuit}
        />
      </Modal>
      <Modal
        onClickOutside={() => {
          setModal(AdministrationTypesModalEnum.IDLE);
        }}
        isOpen={modal === AdministrationTypesModalEnum.DECOR}
      >
        <AdministrationTypesModalsDecor
          decor={decor}
          setDecor={setDecor}
          createNewDecor={createNewDecor}
          onClose={() => setModal(AdministrationTypesModalEnum.IDLE)}
        />
      </Modal>
    </section>
  );
};

export default AdministrationTypes;
