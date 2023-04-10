import React from 'react';
import { Input } from 'antd';

interface IComponentProps {
  filling: { name: string; img: any };
  setFilling: React.Dispatch<React.SetStateAction<{ name: string; img: any }>>;
}

const AdministrationTypesModalsFilling: React.FC<IComponentProps> = ({
  filling,
  setFilling,
}) => {
  const selectFile = (e: any) => {
    setFilling((prev) => {
      return { ...prev, img: e.target.files[0] };
    });
  };
  console.log(filling);
  return (
    <div>
      <Input
        value={filling.name}
        onChange={(e) =>
          setFilling((prevState) => {
            return { ...prevState, name: e.target.value };
          })
        }
      />
      <input type={'file'} onChange={selectFile} />
    </div>
  );
};

export default AdministrationTypesModalsFilling;
