import React from 'react';
import { TextField } from '@consta/uikit/TextField';
import { Button } from '@consta/uikit/Button';
import { Text } from '@consta/uikit/Text';
import styles from './AdministrationTypeModals.styl';

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
  onClose(): void;
}

const AdministrationTypesModalsDecor: React.FC<IComponentProps> = ({
  decor,
  setDecor,
  createNewDecor,
  onClose,
}) => {
  return (
    <div className={styles.Container}>
      <Text size={'2xl'}>Создание декора</Text>
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
      <div className={styles.Container__actions}>
        <Button size={'s'} label={'Отмена'} onClick={onClose} />
        <Button size={'s'} label={'Создать'} onClick={createNewDecor} />
      </div>
    </div>
  );
};

export default AdministrationTypesModalsDecor;
