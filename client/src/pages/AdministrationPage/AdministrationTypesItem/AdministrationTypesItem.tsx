import React from 'react';

interface IComponentProps {
  item: {
    id: number;
    name: string;
    img?: string;
  };
}

const AdministrationTypesItem: React.FC<IComponentProps> = ({ item }) => {
  return <div>{item.name}</div>;
};

export default AdministrationTypesItem;
