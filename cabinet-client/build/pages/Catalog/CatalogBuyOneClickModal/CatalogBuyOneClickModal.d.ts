import React, { SetStateAction } from "react";
interface IComponentProps {
    modal: boolean;
    setModal: React.Dispatch<SetStateAction<boolean>>;
    width: number;
}
declare const CatalogBuyOneClickModal: React.FC<IComponentProps>;
export default CatalogBuyOneClickModal;
