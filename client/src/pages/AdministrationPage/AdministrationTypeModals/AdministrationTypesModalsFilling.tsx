import React, { useEffect, useState } from 'react';
import { TextField } from '@consta/uikit/TextField';
import { Button } from '@consta/uikit/Button';
import styles from 'src/pages/AdministrationPage/AdministrationTypeModals/AdministrationTypeModals.styl';
import { Text } from '@consta/uikit/Text';
import { DragNDropField } from '@consta/uikit/DragNDropField';
import { Attachment } from '@consta/uikit/Attach';

interface IComponentProps {
  filling: { name: string; img: any };
  setFilling: React.Dispatch<React.SetStateAction<{ name: string; img: any }>>;
  onSave(): Promise<void>;
  onClose(): void;
}

const AdministrationTypesModalsFilling: React.FC<IComponentProps> = ({
  filling,
  setFilling,
  onSave,
  onClose,
}) => {
  const [file, setFile] = useState<File[]>([]);
  const selectFile = (file: File) => {
    setFile([file]);
    setFilling((prev) => {
      return { ...prev, img: file };
    });
  };
  return (
    <div className={styles.Container}>
      <Text size={'2xl'}>Создание начинки</Text>
      <TextField
        size={'s'}
        form={'round'}
        label={'Наименование'}
        placeholder={'Введите наименование'}
        value={filling.name}
        onChange={(e) =>
          setFilling((prevState) => {
            return { ...prevState, name: e.value };
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
            <Text size={'l'}>Выберите или перетащите фотографию десерта</Text>
            <Text size={'s'} view={'secondary'}>
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
            <Button size={'xs'} onClick={openFileDialog} label="Выбрать файл" />
          </div>
        )}
      </DragNDropField>
      <div className={styles.Container__actions}>
        <Button size={'s'} label={'Отмена'} onClick={onClose} />
        <Button
          size={'s'}
          label={'Создать'}
          onClick={() => {
            onSave().then(() => onClose());
          }}
        />
      </div>
    </div>
  );
};

export default AdministrationTypesModalsFilling;
