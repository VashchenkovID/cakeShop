import React from 'react';
import { TextField } from '@consta/uikit/TextField';
import { Button } from '@consta/uikit/Button';
import styles from './AdministrationTypeModals.styl';
import { Text } from '@consta/uikit/Text';
interface IComponentProps {
  type: {
    name: string;
  };
  setType: React.Dispatch<React.SetStateAction<{ name: string }>>;
  onSave(): Promise<void>;
  onClose(): void;
}

const AdministrationTypesModalsType: React.FC<IComponentProps> = ({
  type,
  setType,
  onClose,
  onSave,
}) => {
  return (
    <div className={styles.Container}>
      <Text size={'2xl'}>Создание типа</Text>
      <TextField
        size={'s'}
        form={'round'}
        label={'Название'}
        placeholder={'Название'}
        value={type.name}
        onChange={(e) => {
          setType((prevState) => {
            return { ...prevState, name: e.value };
          });
        }}
      />
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

export default AdministrationTypesModalsType;
