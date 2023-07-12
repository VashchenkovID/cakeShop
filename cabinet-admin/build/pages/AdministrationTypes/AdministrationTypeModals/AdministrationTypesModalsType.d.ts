import React from 'react';
interface IComponentProps {
    type: {
        name: string;
    };
    setType: React.Dispatch<React.SetStateAction<{
        id: number | null;
        name: string;
    }>>;
    onSave(): Promise<void>;
    onClose(): void;
    title: string;
    isDelete?: boolean;
}
declare const AdministrationTypesModalsType: React.FC<IComponentProps>;
export default AdministrationTypesModalsType;
