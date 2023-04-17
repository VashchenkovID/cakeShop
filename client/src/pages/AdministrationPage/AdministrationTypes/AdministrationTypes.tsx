import React, { useEffect, useState } from 'react';
import useRequest from 'src/hooks/useRequest';
import cakesApi from 'src/api/requests/cakesApi';
import AdministrationTypesModalsType from 'src/pages/AdministrationPage/AdministrationTypesModals/AdministrationTypesModalsType';
import AdministrationTypesModalsFilling from 'src/pages/AdministrationPage/AdministrationTypesModals/AdministrationTypesModalsFilling';
import styles from './AdministrationTypes.styl';
import AdministrationTypesItem from 'src/pages/AdministrationPage/AdministrationTypesItem/AdministrationTypesItem';
import { Button } from '@consta/uikit/Button';
import { Modal } from '@consta/uikit/Modal';
import {Text} from "@consta/uikit/Text";
export enum AdministrationTypesModalEnum {
  IDLE = 'idle',
  FILLING = 'filling',
  TYPE = 'type',
}

const AdministrationTypes: React.FC = () => {
  const [types, setTypes] = useState([]);
  const [fillings, setFillings] = useState([]);
  const [modal, setModal] = useState(AdministrationTypesModalEnum.IDLE);
  const [type, setType] = useState({ name: '' });
  const [filling, setFilling] = useState({
    name: '',
    img: null,
  });
  const { load: fetchTypes, isLoading: typeLoading } = useRequest(
    cakesApi.getCakeTypes,
    (data) => {
      if (data) {
        setTypes(data.data);
      }
    },
  );

  const { load: fetchFillings, isLoading: fillingLoading } = useRequest(
    cakesApi.getCakeFillings,
    (data) => {
      if (data) {
        setFillings(data.data);
      }
    },
  );

  const createNewType = async () => {
    if (type.name !== '') {
      const data = new FormData();
      data.append('name', type.name);
      await cakesApi.createCakeType(data).then(() => {
        fetchTypes();
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
      });
    }
  };

  useEffect(() => {
    fetchTypes();
    fetchFillings();
  }, []);

  return (
    <section>
      <div className={styles.Types}>
        <div className={styles.Types__column}>
          <Text size={'3xl'}>Типы десертов</Text>
          <Button
            onClick={() => setModal(AdministrationTypesModalEnum.TYPE)}
            label={'Создать'}
          />

          <div className={styles.Types__column__rows}>
            {types.length > 0 &&
              types.map((item, index) => (
                <AdministrationTypesItem item={item} key={index} />
              ))}
          </div>
        </div>
        <div className={styles.Types__column}>
          <Text size={'3xl'}>Начинки тортов</Text>
          <Button
            onClick={() => setModal(AdministrationTypesModalEnum.FILLING)}
            label={'Создать'}
          />
          <div className={styles.Types__column__rows}>
            {fillings.length > 0 &&
              fillings.map((item, index) => (
                <AdministrationTypesItem item={item} key={index} />
              ))}
          </div>
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
    </section>
  );
};

export default AdministrationTypes;
