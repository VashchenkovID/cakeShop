import React from 'react';
import { TextField } from '@consta/uikit/TextField';
import { Button } from '@consta/uikit/Button';

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
  const selectFile = (e: any) => {
    setBiscuit((prev) => {
      return { ...prev, img: e.target.files[0] };
    });
  };
  return (
    <div>
      <TextField
        value={biscuit.name}
        onChange={(e) =>
          setBiscuit((prevState) => {
            return { ...prevState, name: e.value };
          })
        }
      />
      <input type={'file'} onChange={selectFile} />
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

export default AdministrationTypesModalsBiscuit;
