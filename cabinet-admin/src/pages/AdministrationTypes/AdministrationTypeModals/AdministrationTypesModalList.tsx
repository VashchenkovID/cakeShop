import React, { useState } from "react";
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
import cakesApi from "src/api/requests/cakesApi";
import { toast } from "react-toastify";

interface IComponentProps {
  type: { name: string; id: number | null };
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
  refreshPage(): void;
  clear(): void;
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
  refreshPage,
  clear,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const createNewType = async () => {
    try {
      if (type.name !== "") {
        setIsLoading(true);
        const data = new FormData();
        data.append("name", type.name);
        await cakesApi
          .createCakeType(data)
          .then(() => {
              refreshPage();
            setIsLoading(false);
          })
          .then(() => clear());
      } else {
        toast.error("Введите наименование");
        setIsLoading(false);
      }
    } catch (у) {
      toast.error("Ошибка при создании типа");
      setIsLoading(false);
    }
  };
  const updateType = async () => {
    try {
      if (type.id && type.name !== "") {
        setIsLoading(true);
        await cakesApi
          .updateCakeType(type.id, type.name)
          .then(() => {
              refreshPage();
            setIsLoading(false);
          })
          .then(() => clear());
      }
    } catch (e) {
      setIsLoading(false);
      toast.error("Ошибка при редактировании типа");
    }
  };
  const removeType = async () => {
    try {
      if (type.id) {
        setIsLoading(true);
        await cakesApi.removeCakeType(type.id).then(() => {
            refreshPage();
          clear();
          setIsLoading(false);
        });
      }
    } catch (e) {
      setIsLoading(false);
      toast.error("Ошибка при удалении типа");
    }
  };

  const createNewFilling = async () => {
    try {
      if (filling.name !== "") {
        setIsLoading(true);
        const data = new FormData();
        data.append("name", filling.name);
        data.append("img", filling.img);
        await cakesApi.createCakeFilling(data).then(() => {
            refreshPage();
          clear();
          setIsLoading(false);
        });
      }
    } catch (e) {
      setIsLoading(false);
      toast.error("Ошибка при создании начинки");
    }
  };
  const updateFilling = async () => {
    try {
      if (filling.id && filling.name !== "") {
        setIsLoading(true);
        const data = new FormData();
        data.append("name", filling.name);
        data.append("img", filling.img);
        await cakesApi.updateCakeFilling(filling.id, data).then(() => {
            refreshPage();
          clear();
          setIsLoading(false);
        });
      }
    } catch (e) {
      setIsLoading(false);
      toast.error("Ошибка при редактировании начинки");
    }
  };
  const removeFilling = async () => {
    try {
      if (filling.id) {
        setIsLoading(true);
        await cakesApi.removeCakeFilling(filling.id).then(() => {
            refreshPage();
          clear();
          setIsLoading(false);
        });
      }
    } catch (e) {
      setIsLoading(false);
      toast.error("Ошибка при удалении начинки");
    }
  };

  const createNewBiscuit = async () => {
    try {
      if (biscuit.name !== "") {
        setIsLoading(true);
        const data = new FormData();
        data.append("name", biscuit.name);
        data.append("img", biscuit.img);
        await cakesApi.createBiscuit(data).then(() => {
            refreshPage();
          clear();
          setIsLoading(false);
        });
      }
    } catch (e) {
      setIsLoading(false);
      toast.error("Ошибка при создании бисквита");
    }
  };

  const updateBiscuit = async () => {
    try {
      if (biscuit.id && biscuit.name !== "") {
        setIsLoading(true);
        const data = new FormData();
        data.append("name", biscuit.name);
        data.append("img", biscuit.img);
        await cakesApi.updateBiscuit(biscuit.id, data).then(() => {
            refreshPage();
          clear();
          setIsLoading(false);
        });
      }
    } catch (e) {
      setIsLoading(false);
      toast.error("Ошибка при редактировании бисквита");
    }
  };
  const removeBiscuit = async () => {
    try {
      if (biscuit.id) {
        setIsLoading(true);
        await cakesApi.removeBiscuit(biscuit.id).then(() => {
            refreshPage();
          clear();
          setIsLoading(false);
        });
      }
    } catch (e) {
      setIsLoading(false);
      toast.error("Ошибка при удалении бисквита");
    }
  };

  const createNewDecor = async () => {
    try {
      if (
        decor.name !== "" &&
        decor.countType !== "" &&
        decor.count !== 0 &&
        decor.pricePerUnit !== "" &&
        decor.constPrice !== ""
      ) {
        setIsLoading(true);
        const data = new FormData();
        data.append("name", decor.name);
        data.append("countType", decor.countType);
        data.append("count", decor.count.toString());
        data.append("pricePerUnit", decor.pricePerUnit.toString());
        data.append("constPrice", decor.constPrice.toString());
        await cakesApi.createDecor(data).then(() => {
            refreshPage();
          clear();
          setIsLoading(false);
        });
      } else {
        toast.error("Ошибки в заполнении полей");
      }
    } catch (e) {
      setIsLoading(false);
      toast.error("Ошибка при создании декора");
    }
  };

  const updateDecor = async () => {
    try {
      if (
        decor.id &&
        decor.name !== "" &&
        decor.countType !== "" &&
        decor.count !== 0 &&
        decor.pricePerUnit !== "" &&
        !isNaN(Number(decor.pricePerUnit)) &&
        decor.constPrice !== "" &&
        !isNaN(Number(decor.constPrice))
      ) {
        setIsLoading(true);
        const data = new FormData();
        data.append("name", decor.name);
        data.append("countType", decor.countType);
        data.append("count", decor.count.toString());
        data.append("pricePerUnit", decor.pricePerUnit.toString());
        data.append("constPrice", decor.constPrice.toString());
        await cakesApi.updateDecor(decor.id, data).then(() => {
            refreshPage();
          clear();
          setIsLoading(false);
        });
      } else {
        toast.error("Ошибки в заполнении полей");
      }
    } catch (e) {
      setIsLoading(false);
      toast.error("Ошибка при редактировании декора");
    }
  };

  const removeDecor = async () => {
    try {
      if (decor.id) {
        setIsLoading(true);
        await cakesApi.removeDecor(decor.id).then(() => {
            refreshPage();
          clear();
          setIsLoading(false);
        });
      }
    } catch (e) {
      setIsLoading(false);
      toast.error("Ошибка при удалении декора");
    }
  };
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
          isLoading={isLoading}
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
          isLoading={isLoading}
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
          isLoading={isLoading}
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
          isLoading={isLoading}
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
          isLoading={isLoading}
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
          isLoading={isLoading}
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
          isLoading={isLoading}
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
          isLoading={isLoading}
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
          isLoading={isLoading}
        />
      </Modal>
      <Modal
        onClickOutside={() => {
          setModal(AdministrationTypesModalEnum.IDLE);
        }}
        isOpen={modal === AdministrationTypesModalEnum.DECOR}
      >
        <AdministrationTypesModalsDecor
            isLoading={isLoading}
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
          isLoading={isLoading}
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
          isLoading={isLoading}
        />
      </Modal>
    </div>
  );
};

export default AdministrationTypesModalList;
