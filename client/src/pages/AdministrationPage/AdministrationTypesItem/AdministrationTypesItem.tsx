import React from 'react';
import { Text } from '@consta/uikit/Text';

interface IComponentProps {
  item: {
    id: number;
    name: string;
    img?: string;
  };
}

const AdministrationTypesItem: React.FC<IComponentProps> = ({ item }) => {
  return <Text size={'l'}>{item.name}</Text>;
};

export default AdministrationTypesItem;
