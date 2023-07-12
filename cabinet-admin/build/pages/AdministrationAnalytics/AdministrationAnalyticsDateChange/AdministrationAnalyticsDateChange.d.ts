import React, { SetStateAction } from 'react';
interface IComponentProps {
    date: Date;
    setDate: React.Dispatch<SetStateAction<Date>>;
}
declare const AdministrationAnalyticsDateChange: React.FC<IComponentProps>;
export default AdministrationAnalyticsDateChange;
