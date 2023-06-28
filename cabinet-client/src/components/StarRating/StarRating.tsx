import { IconFavorite } from '@consta/uikit/IconFavorite';
import React, { useState } from 'react';
import style from './StarRating.module.styl';

interface IComponentProps {
  readonly?: boolean;
  rating: number;
  setRating?: (value: number) => void;
}

const StarRating: React.FC<IComponentProps> = ({
  readonly,
  rating,
  setRating,
}) => {
  const [hover, setHover] = useState(0);
  return (
    <div className={style.root}>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? style.on : style.off}
            onClick={() => setRating && setRating(index)}
            onMouseEnter={() => !readonly && setHover(index)}
            onMouseLeave={() => !readonly && setHover(rating)}
            disabled={readonly}
          >
            <IconFavorite />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
