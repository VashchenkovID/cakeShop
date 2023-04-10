import React from 'react';
import { Input } from 'antd';

interface IComponentProps {
  type: {
    name: string;
  };
  setType: React.Dispatch<React.SetStateAction<{ name: string }>>;
}

const AdministrationTypesModalsType: React.FC<IComponentProps> = ({
  type,
  setType,
}) => {
  return (
    <div>
      <h4>Введите название</h4>
      <Input
        placeholder={'Название'}
        value={type.name}
        onChange={(e) => {
          setType((prevState) => {
            return { ...prevState, name: e.target.value };
          });
        }}
      />
    </div>
  );
};

export default AdministrationTypesModalsType;
