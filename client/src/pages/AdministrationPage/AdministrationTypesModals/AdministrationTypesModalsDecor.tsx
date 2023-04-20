import React from 'react';
import { TextField } from '@consta/uikit/TextField';
import { Button } from '@consta/uikit/Button';

interface IComponentProps {
  decor: {
    name: string;
    count: number;
    countType: string;
    pricePerUnit: number;
    constPrice: number;
  };
  setDecor: React.Dispatch<
    React.SetStateAction<{
      name: string;
      count: number;
      countType: string;
      pricePerUnit: number;
      constPrice: number;
    }>
  >;
  createNewDecor(): Promise<void>;
}

const AdministrationTypesModalsDecor: React.FC<IComponentProps> = ({
  decor,
  setDecor,
  createNewDecor,
}) => {
  return (
    <div>
      <TextField
        label={'Наименование'}
        placeholder={'Введите наименование'}
        value={decor.name}
        onChange={({ value }) =>
          setDecor((prev) => {
            return { ...prev, name: value };
          })
        }
      />
      <TextField
        type={'number'}
        label={'Количество в упаковке'}
        placeholder={'Введите количество'}
        value={decor.count.toString()}
        onChange={({ value }) =>
          setDecor((prev) => {
            return { ...prev, count: Number(value) };
          })
        }
      />
      <TextField
        label={'Единица измерения'}
        placeholder={'Введите единицу измерения'}
        value={decor.countType}
        onChange={({ value }) =>
          setDecor((prev) => {
            return { ...prev, countType: value };
          })
        }
      />
      <TextField
        type={'number'}
        label={'Цена за единицу'}
        placeholder={'Введите цену'}
        value={decor.pricePerUnit.toString()}
        onChange={({ value }) =>
          setDecor((prev) => {
            return { ...prev, pricePerUnit: Number(value) };
          })
        }
      />
      <TextField
        type={'number'}
        label={'Цена закупки'}
        placeholder={'Введите цену'}
        value={decor.constPrice.toString()}
        onChange={({ value }) =>
          setDecor((prev) => {
            return { ...prev, constPrice: Number(value) };
          })
        }
      />
      <Button size={'s'} label={'Создать'} onClick={createNewDecor} />
    </div>
  );
};

export default AdministrationTypesModalsDecor;
