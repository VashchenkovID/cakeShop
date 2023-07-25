import React, { useState } from "react";
import { TextField } from "@consta/uikit/TextField";
import { Button } from "@consta/uikit/Button";
import styles from "src/pages/AdministrationTypes/AdministrationTypeModals/AdministrationTypeModals.module.styl";
import { Text } from "@consta/uikit/Text";
import { DragNDropField } from "@consta/uikit/DragNDropField";
import { Attachment } from "@consta/uikit/Attach";
import { AdministrationTypesItemWithImg } from "src/pages/AdministrationTypes/AdministrationTypes";

interface IComponentProps {
  filling: { name: string; img: any };
  setFilling: React.Dispatch<
    React.SetStateAction<AdministrationTypesItemWithImg>
  >;
  onSave(): Promise<void>;
  onClose(): void;
  title: string;
  isDelete?: boolean;
  isLoading: boolean;
}

const AdministrationTypesModalsFilling: React.FC<IComponentProps> = ({
  filling,
  setFilling,
  onSave,
  onClose,
  title,
  isDelete,
  isLoading,
}) => {
  const [file, setFile] = useState<File[]>([]);
  const selectFile = (file: File) => {
    setFile([file]);
    setFilling((prev) => {
      return { ...prev, img: file };
    });
  };
  return (
    <>
      {!isDelete ? (
        <div className={styles.Container}>
          <Text size={"2xl"}>Создание начинки</Text>
          <TextField
            size={"s"}
            form={"round"}
            label={"Наименование"}
            placeholder={"Введите наименование"}
            value={filling.name}
            onChange={(e) =>
              setFilling((prevState) => {
                return { ...prevState, name: e.value || "" };
              })
            }
          />
          <DragNDropField
            multiple={false}
            onDropFiles={(file) => {
              selectFile(file[0]);
            }}
          >
            {({ openFileDialog }) => (
              <div className={styles.Container__files}>
                <Text size={"l"}>
                  Выберите или перетащите фотографию десерта
                </Text>
                <Text size={"s"} view={"secondary"}>
                  Поддерживаются файлы форматов jpg,png,jpeg
                </Text>
                {file.map((f) => (
                  <Attachment
                    key={f.name}
                    fileName={f.name}
                    fileExtension={f.name.match(/\.(?!.*\.)(\w*)/)?.[1]}
                    fileDescription={f.type}
                  />
                ))}
                <Button
                  size={"xs"}
                  onClick={openFileDialog}
                  label="Выбрать файл"
                />
              </div>
            )}
          </DragNDropField>
          <div className={styles.Container__actions}>
            <Button size={"s"} label={"Отмена"} onClick={onClose} />
            <Button
              size={"s"}
              label={"Создать"}
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
          <Text>Вы действительно хотите удалить начинку {filling.name} ?</Text>
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

export default AdministrationTypesModalsFilling;
