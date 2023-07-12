import React, { SetStateAction } from 'react';
interface IComponentProps {
    activeElement: {
        type: string;
        id: number | null;
    };
    modal: boolean;
    setModal: React.Dispatch<SetStateAction<boolean>>;
}
declare const AdministrationOrderProcessingCraftModal: React.FC<IComponentProps>;
export default AdministrationOrderProcessingCraftModal;
