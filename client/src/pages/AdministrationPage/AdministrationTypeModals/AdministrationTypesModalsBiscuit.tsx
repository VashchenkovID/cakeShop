import React, { useState } from 'react';
import { TextField } from '@consta/uikit/TextField';
import { Button } from '@consta/uikit/Button';
import styles from './AdministrationTypeModals.styl';
import { DragNDropField } from '@consta/uikit/DragNDropField';
import { Text } from '@consta/uikit/Text';
import { Attachment } from '@consta/uikit/Attach';

interface IComponentProps {
  biscuit: { name: string; img: any };
  setBiscuit: React.Dispatch<React.SetStateAction<{ name: string; img: any }>>;
  onSave(): Promise<void>;
  onClose(): void;
}

const AdministrationTypesModalsBiscuit: React.FC<IComponentProps> = ({
  biscuit,
  setBiscuit,
  onClose,
  onSave,
}) => {
  const [file, setFile] = useState<File[]>([]);
  const selectFile = (file: File) => {
    setFile([file]);
    setBiscuit((prev) => {
      return { ...prev, img: file };
    });
  };
  return (
    <div className={styles.Container}>
      <Text size={'2xl'}>Создание бисквита</Text>
      <TextField
        size={'s'}
        form={'round'}
        label={'Наименование'}
        placeholder={'Введите наименование'}
        value={biscuit.name}
        onChange={(e) =>
          setBiscuit((prevState) => {
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

export default AdministrationTypesModalsBiscuit;
