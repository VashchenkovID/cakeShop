import React from "react";
import { RatingItemModel } from "src/api/models/RatingItemModel";
interface IComponentProps {
    rating: RatingItemModel;
    width: number;
}
declare const FeedbackItem: React.FC<IComponentProps>;
export default FeedbackItem;
