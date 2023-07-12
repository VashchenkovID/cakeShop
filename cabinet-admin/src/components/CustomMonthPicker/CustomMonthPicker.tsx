import React, { SetStateAction, useMemo } from 'react';
import { add, getMonth, sub } from 'date-fns';
import styles from './CustomMonthPicker.module.styl';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';
import { IconArrowLeft } from '@consta/uikit/IconArrowLeft';
import { rusMonths } from 'src/utils/constants';
import { IconArrowRight } from '@consta/uikit/IconArrowRight';

interface IComponentProps {
  date: Date;
  setDate: React.Dispatch<SetStateAction<Date>>;
  setNull: React.Dispatch<SetStateAction<any>>;
}

const CustomMonthPicker: React.FC<IComponentProps> = ({
  setDate,
  date,
  setNull,
}) => {
  const month = useMemo(() => {
    return getMonth(date);
  }, [date]);
  return (
    <div className={styles.Change}>
      <div className={styles.Change__actions}>
        <Button
          iconLeft={IconArrowLeft}
          form={'round'}
          onClick={() => {
            setNull(null);
            setDate((prevState) => {
              return sub(prevState, { months: 1 });
            });
          }}
        />
        <Text>{date ? rusMonths[month] : null}</Text>
        <Button
          iconLeft={IconArrowRight}
          form={'round'}
          onClick={() => {
            setNull(null);
            setDate((prevState) => {
              return add(prevState, { months: 1 });
            });
          }}
        />
      </div>
    </div>
  );
};

export default CustomMonthPicker;
