import React from 'react';
import { TextField } from '@consta/uikit/TextField';
import { Button } from '@consta/uikit/Button';

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
    <div>
      <h4>Введите название</h4>
      <TextField
        placeholder={'Название'}
        value={type.name}
        onChange={(e) => {
          setType((prevState) => {
            return { ...prevState, name: e.value };
          });
        }}
      />
      <div>
        <Button label={'Отмена'} onClick={onClose} />
        <Button
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
