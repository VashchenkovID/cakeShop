import React from "react";
import { TextField } from "@consta/uikit/TextField";
import { Button } from "@consta/uikit/Button";
import styles from "./AdministrationTypeModals.module.styl";
import { Text } from "@consta/uikit/Text";
interface IComponentProps {
  type: {
    name: string;
  };
  setType: React.Dispatch<
    React.SetStateAction<{ id: number | null; name: string }>
  >;
  onSave(): Promise<void>;
  onClose(): void;
  title: string;
  isDelete?: boolean;
  isLoading: boolean;
}

const AdministrationTypesModalsType: React.FC<IComponentProps> = ({
  type,
  setType,
  onClose,
  onSave,
  title,
  isDelete,
  isLoading,
}) => {
  return (
    <>
      {!isDelete ? (
        <div className={styles.Container}>
          <Text size={"2xl"}>{title}</Text>
          <TextField
            size={"s"}
            form={"round"}
            label={"Название"}
            placeholder={"Название"}
            value={type.name}
            onChange={(e) => {
              setType((prevState) => {
                return { ...prevState, name: e.value || "" };
              });
            }}
          />
          <div className={styles.Container__actions}>
            <Button size={"s"} label={"Отмена"} onClick={onClose} />
            <Button
              size={"s"}
              label={"Сохранить"}
              loading={isLoading}
              onClick={() => {
                onSave().then(() => onClose());
              }}
            />
          </div>
        </div>
      ) : (
        <div className={styles.Container}>
          <Text size={"2xl"}>{title}</Text>
          <Text>Вы действительно хотите удалить тип {type.name} ?</Text>
          <div className={styles.Container__actions}>
            <Button size={"s"} label={"Отмена"} onClick={onClose} />
            <Button
              size={"s"}
              label={"Удалить"}
              loading={isLoading}
              onClick={() => {
                onSave().then(() => onClose());
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AdministrationTypesModalsType;
