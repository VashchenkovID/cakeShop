import React, { useMemo } from 'react';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';
import { IconArrowLeft } from '@consta/uikit/IconArrowLeft';
import { IconArrowRight } from '@consta/uikit/IconArrowRight';
import { getMonth } from 'date-fns';
import { rusMonths } from 'src/utils/constants';
import { add, sub } from 'date-fns';
import styles from './AdministrationAnalyticsDateChange.module.styl';
const AdministrationAnalyticsDateChange = ({ date, setDate, }) => {
    const month = useMemo(() => {
        return getMonth(date);
    }, [date]);
    return (React.createElement("div", { className: styles.Change },
        React.createElement(Text, { size: '3xl' }, "\u041C\u0435\u0441\u044F\u0446"),
        React.createElement("div", { className: styles.Change__actions },
            React.createElement(Button, { iconLeft: IconArrowLeft, form: 'round', onClick: () => setDate((prevState) => {
                    return sub(prevState, { months: 1 });
                }) }),
            React.createElement(Text, { size: '2xl' }, date ? rusMonths[month] : null),
            React.createElement(Button, { iconLeft: IconArrowRight, form: 'round', onClick: () => setDate((prevState) => {
                    return add(prevState, { months: 1 });
                }) }))));
};
export default AdministrationAnalyticsDateChange;
//# sourceMappingURL=AdministrationAnalyticsDateChange.js.map