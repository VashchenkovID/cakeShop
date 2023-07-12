import React, { SetStateAction } from 'react';
interface IComponentProps {
    date: Date;
    setDate: React.Dispatch<SetStateAction<Date>>;
    setNull: React.Dispatch<SetStateAction<any>>;
}
declare const CustomMonthPicker: React.FC<IComponentProps>;
export default CustomMonthPicker;
