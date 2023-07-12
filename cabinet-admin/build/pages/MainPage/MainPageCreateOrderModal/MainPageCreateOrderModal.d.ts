import React, { SetStateAction } from 'react';
interface IComponentProps {
    modal: boolean;
    setModal: React.Dispatch<SetStateAction<boolean>>;
}
declare const MainPageCreateOrderModal: React.FC<IComponentProps>;
export default MainPageCreateOrderModal;
