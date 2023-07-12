import React, { SetStateAction } from 'react';
import { RatingItemModel } from 'src/api/models/RatingItemModel';
import { PaginationStateType } from 'src/components/PaginationCustom/PaginationCustom';
interface IComponentProps {
    isLoading: boolean;
    ratings: RatingItemModel[];
    setLimit: React.Dispatch<SetStateAction<number>>;
    limit: number;
    activeItem: number | null;
    setPagination: React.Dispatch<React.SetStateAction<PaginationStateType>>;
    pagination: PaginationStateType;
}
declare const AdministrationFeedbackRatings: React.FC<IComponentProps>;
export default AdministrationFeedbackRatings;
