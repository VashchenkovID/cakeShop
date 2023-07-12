import { IconFavorite } from '@consta/uikit/IconFavorite';
import React, { useState } from 'react';
import style from './StarRating.module.styl';
const StarRating = ({ readonly, rating, setRating, }) => {
    const [hover, setHover] = useState(0);
    return (React.createElement("div", { className: style.root }, [...Array(5)].map((star, index) => {
        index += 1;
        return (React.createElement("button", { type: "button", key: index, className: index <= (hover || rating) ? style.on : style.off, onClick: () => setRating && setRating(index), onMouseEnter: () => !readonly && setHover(index), onMouseLeave: () => !readonly && setHover(rating), disabled: readonly },
            React.createElement(IconFavorite, null)));
    })));
};
export default StarRating;
//# sourceMappingURL=StarRating.js.map