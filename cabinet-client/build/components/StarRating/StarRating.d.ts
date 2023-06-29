import React from 'react';
interface IComponentProps {
    readonly?: boolean;
    rating: number;
    setRating?: (value: number) => void;
}
declare const StarRating: React.FC<IComponentProps>;
export default StarRating;
