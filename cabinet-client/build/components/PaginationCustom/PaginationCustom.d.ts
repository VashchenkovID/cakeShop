import React from "react";
export interface PaginationStateType {
    page: number;
    perPage: number;
}
export interface IPaginationItemsFooterProps {
    items?: Array<number>;
    total: number;
    pagination: PaginationStateType;
    setPagination: React.Dispatch<React.SetStateAction<PaginationStateType>>;
    className?: string;
}
declare const PaginationCustom: React.FC<IPaginationItemsFooterProps>;
export default PaginationCustom;
