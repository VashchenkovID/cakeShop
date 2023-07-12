import React, { useMemo } from 'react';
import { add, getMonth, sub } from 'date-fns';
import styles from './CustomMonthPicker.module.styl';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';
import { IconArrowLeft } from '@consta/uikit/IconArrowLeft';
import { rusMonths } from 'src/utils/constants';
import { IconArrowRight } from '@consta/uikit/IconArrowRight';
const CustomMonthPicker = ({ setDate, date, setNull, }) => {
    const month = useMemo(() => {
        return getMonth(date);
    }, [date]);
    return (React.createElement("div", { className: styles.Change },
        React.createElement("div", { className: styles.Change__actions },
            React.createElement(Button, { iconLeft: IconArrowLeft, form: 'round', onClick: () => {
                    setNull(null);
                    setDate((prevState) => {
                        return sub(prevState, { months: 1 });
                    });
                } }),
            React.createElement(Text, null, date ? rusMonths[month] : null),
            React.createElement(Button, { iconLeft: IconArrowRight, form: 'round', onClick: () => {
                    setNull(null);
                    setDate((prevState) => {
                        return add(prevState, { months: 1 });
                    });
                } }))));
};
export default CustomMonthPicker;
//# sourceMappingURL=CustomMonthPicker.js.map