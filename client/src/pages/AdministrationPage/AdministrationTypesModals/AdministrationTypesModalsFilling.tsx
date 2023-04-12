import React from 'react';
import { TextField } from '@consta/uikit/TextField';
import { Button } from '@consta/uikit/Button';

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
  const selectFile = (e: any) => {
    setFilling((prev) => {
      return { ...prev, img: e.target.files[0] };
    });
  };
  return (
    <div>
      <TextField
        value={filling.name}
        onChange={(e) =>
          setFilling((prevState) => {
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

export default AdministrationTypesModalsFilling;
