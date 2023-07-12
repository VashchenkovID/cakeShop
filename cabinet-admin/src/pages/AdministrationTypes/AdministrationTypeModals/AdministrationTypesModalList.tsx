import React from "react";
import {
  AdministrationTypesDecorItem,
  AdministrationTypesItemWithImg,
  AdministrationTypesModalEnum,
} from "../AdministrationTypes";
import { Modal } from "@consta/uikit/Modal";
import AdministrationTypesModalsType from "src/pages/AdministrationTypes/AdministrationTypeModals/AdministrationTypesModalsType";
import AdministrationTypesModalsFilling from "src/pages/AdministrationTypes/AdministrationTypeModals/AdministrationTypesModalsFilling";
import styles from "src/pages/AdministrationTypes/AdministrationTypes.module.styl";
import AdministrationTypesModalsBiscuit from "src/pages/AdministrationTypes/AdministrationTypeModals/AdministrationTypesModalsBiscuit";
import AdministrationTypesModalsDecor from "src/pages/AdministrationTypes/AdministrationTypeModals/AdministrationTypesModalsDecor";

interface IComponentProps {
  type: { name: string };
  setType: React.Dispatch<
    React.SetStateAction<{ id: number | null; name: string }>
  >;
  modal: AdministrationTypesModalEnum;
  setModal: React.Dispatch<React.SetStateAction<AdministrationTypesModalEnum>>;
  filling: AdministrationTypesItemWithImg;
  setFilling: React.Dispatch<
    React.SetStateAction<AdministrationTypesItemWithImg>
  >;
  biscuit: AdministrationTypesItemWithImg;
  setBiscuit: React.Dispatch<
    React.SetStateAction<AdministrationTypesItemWithImg>
  >;
  decor: AdministrationTypesDecorItem;
  setDecor: React.Dispatch<React.SetStateAction<AdministrationTypesDecorItem>>;
  types: { id: number; name: string }[];
  fillings: AdministrationTypesItemWithImg[];
  biscuits: AdministrationTypesItemWithImg[];
  decors: AdministrationTypesDecorItem[];
  createNewType(): Promise<void>;
  updateType(): Promise<void>;
  removeType(): Promise<void>;
  createNewFilling(): Promise<void>;
  updateFilling(): Promise<void>;
  removeFilling(): Promise<void>;
  createNewBiscuit(): Promise<void>;
  updateBiscuit(): Promise<void>;
  removeBiscuit(): Promise<void>;
  createNewDecor(): Promise<void>;
  updateDecor(): Promise<void>;
  removeDecor(): Promise<void>;
}

const AdministrationTypesModalList: React.FC<IComponentProps> = ({
  type,
  setType,
  modal,
  setModal,
  filling,
  setFilling,
  biscuit,
  setBiscuit,
  decor,
  setDecor,
  createNewType,
  createNewDecor,
  createNewFilling,
  createNewBiscuit,
  updateDecor,
  updateFilling,
  updateType,
  updateBiscuit,
  removeDecor,
  removeType,
  removeFilling,
  removeBiscuit,
}) => {
  return (
    <div>
      {/*  Типы */}
      <Modal
        isOpen={modal === AdministrationTypesModalEnum.TYPE}
        onClickOutside={() => {
          setModal(AdministrationTypesModalEnum.IDLE);
        }}
      >
        <AdministrationTypesModalsType
          title={"Создание типа"}
          type={type}
          setType={setType}
          onClose={() => setModal(AdministrationTypesModalEnum.IDLE)}
          onSave={createNewType}
        />
      </Modal>
      <Modal
        isOpen={modal === AdministrationTypesModalEnum.TYPE_EDIT}
        onClickOutside={() => {
          setModal(AdministrationTypesModalEnum.IDLE);
        }}
      >
        <AdministrationTypesModalsType
          title={"Редактирование типа"}
          type={type}
          setType={setType}
          onClose={() => setModal(AdministrationTypesModalEnum.IDLE)}
          onSave={updateType}
        />
      </Modal>
      <Modal
        isOpen={modal === AdministrationTypesModalEnum.TYPE_REMOVE}
        onClickOutside={() => {
          setModal(AdministrationTypesModalEnum.IDLE);
        }}
      >
        <AdministrationTypesModalsType
          title={"Удаление типа"}
          type={type}
          setType={setType}
          onClose={() => setModal(AdministrationTypesModalEnum.IDLE)}
          onSave={removeType}
          isDelete
        />
      </Modal>
      <Modal
        onClickOutside={() => {
          setModal(AdministrationTypesModalEnum.IDLE);
        }}
        isOpen={modal === AdministrationTypesModalEnum.FILLING}
      >
        <AdministrationTypesModalsFilling
          title={"Создание начинки"}
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
        isOpen={modal === AdministrationTypesModalEnum.FILLING_EDIT}
      >
        <AdministrationTypesModalsFilling
          title={"Редактирование начинки"}
          filling={filling}
          setFilling={setFilling}
          onClose={() => setModal(AdministrationTypesModalEnum.IDLE)}
          onSave={updateFilling}
        />
      </Modal>
      <Modal
        onClickOutside={() => {
          setModal(AdministrationTypesModalEnum.IDLE);
        }}
        isOpen={modal === AdministrationTypesModalEnum.FILLING_REMOVE}
      >
        <AdministrationTypesModalsFilling
          title={"Удаление начинки"}
          filling={filling}
          isDelete
          setFilling={setFilling}
          onClose={() => setModal(AdministrationTypesModalEnum.IDLE)}
          onSave={removeFilling}
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
          title={"Создание бисквита"}
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
        className={styles.Modal}
        isOpen={modal === AdministrationTypesModalEnum.BISCUIT_EDIT}
      >
        <AdministrationTypesModalsBiscuit
          title={"Редактирование бисквита"}
          biscuit={biscuit}
          setBiscuit={setBiscuit}
          onClose={() => setModal(AdministrationTypesModalEnum.IDLE)}
          onSave={updateBiscuit}
        />
      </Modal>
      <Modal
        onClickOutside={() => {
          setModal(AdministrationTypesModalEnum.IDLE);
        }}
        className={styles.Modal}
        isOpen={modal === AdministrationTypesModalEnum.BISCUIT_REMOVE}
      >
        <AdministrationTypesModalsBiscuit
          title={"Удаление бисквита"}
          biscuit={biscuit}
          setBiscuit={setBiscuit}
          onClose={() => setModal(AdministrationTypesModalEnum.IDLE)}
          onSave={removeBiscuit}
          isDelete
        />
      </Modal>
      <Modal
        onClickOutside={() => {
          setModal(AdministrationTypesModalEnum.IDLE);
        }}
        isOpen={modal === AdministrationTypesModalEnum.DECOR}
      >
        <AdministrationTypesModalsDecor
          title={"Создание декора"}
          decor={decor}
          setDecor={setDecor}
          createNewDecor={createNewDecor}
          onClose={() => setModal(AdministrationTypesModalEnum.IDLE)}
        />
      </Modal>
      <Modal
        onClickOutside={() => {
          setModal(AdministrationTypesModalEnum.IDLE);
        }}
        isOpen={modal === AdministrationTypesModalEnum.DECOR_EDIT}
      >
        <AdministrationTypesModalsDecor
          title={"Редактирование декора"}
          decor={decor}
          setDecor={setDecor}
          createNewDecor={updateDecor}
          onClose={() => setModal(AdministrationTypesModalEnum.IDLE)}
        />
      </Modal>
      <Modal
        onClickOutside={() => {
          setModal(AdministrationTypesModalEnum.IDLE);
        }}
        isOpen={modal === AdministrationTypesModalEnum.DECOR_REMOVE}
      >
        <AdministrationTypesModalsDecor
          title={"Удаление декора"}
          decor={decor}
          setDecor={setDecor}
          createNewDecor={removeDecor}
          isDelete
          onClose={() => setModal(AdministrationTypesModalEnum.IDLE)}
        />
      </Modal>
    </div>
  );
};

export default AdministrationTypesModalList;
