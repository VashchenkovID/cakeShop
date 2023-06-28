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
    pricePerUnit:string;
    constPrice:string;
  };
  setDecor: React.Dispatch<
    React.SetStateAction<{
      name: string;
      count: number;
      countType: string;
      pricePerUnit: string;
      constPrice: string;
    }>
  >;
  createNewDecor(): Promise<void>;
  onClose(): void;
  title: string;
  isDelete?: boolean;
}

const AdministrationTypesModalsDecor: React.FC<IComponentProps> = ({
  decor,
  setDecor,
  createNewDecor,
  onClose,
  title,
  isDelete,
}) => {
  return (
    <>
      {!isDelete ? (
        <div className={styles.Container}>
          <Text size={'2xl'}>{title}</Text>
          <TextField
            size={'s'}
            form={'round'}
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
            size={'s'}
            form={'round'}
            type={'number'}
            label={'Количество в упаковке'}
            placeholder={'Введите количество'}
            value={String(decor.count)}
            onChange={({ value }) =>
              setDecor((prev) => {
                return { ...prev, count: Number(value) };
              })
            }
          />
          <TextField
            size={'s'}
            form={'round'}
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
            size={'s'}
            form={'round'}
            label={'Цена за единицу'}
            placeholder={'Введите цену'}
            value={String(decor.pricePerUnit)}
            onChange={({ value }) =>
              setDecor((prev) => {
                return { ...prev, pricePerUnit: value };
              })
            }
          />
          <TextField
            size={'s'}
            form={'round'}
            label={'Цена закупки'}
            placeholder={'Введите цену'}
            value={String(decor.constPrice)}
            onChange={({ value }) =>
              setDecor((prev) => {
                return { ...prev, constPrice: value };
              })
            }
          />
          <div className={styles.Container__actions}>
            <Button size={'s'} label={'Отмена'} onClick={onClose} />
            <Button
              size={'s'}
              label={'Сохранить'}
              onClick={() => {
                createNewDecor().then(() => onClose());
              }}
            />
          </div>
        </div>
      ) : (
        <div className={styles.Container}>
          <Text size={'2xl'}>{title}</Text>
          <Text>Вы действительно хотите удалить декор {decor.name} ?</Text>
          <div className={styles.Container__actions}>
            <Button size={'s'} label={'Отмена'} onClick={onClose} />
            <Button
              size={'s'}
              label={'Удалить'}
              onClick={() => {
                createNewDecor().then(() => onClose());
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AdministrationTypesModalsDecor;
