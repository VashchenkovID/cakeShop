import React, { useMemo } from "react";
import { Text } from "@consta/uikit/Text";
import styles from "./CatalogItemPrice.module.styl";
const CatalogItemPrice = ({ price, countWeightType, discount, }) => {
    const itemWithDiscountPrice = useMemo(() => {
        if (discount === 0) {
            return null;
        }
        else {
            return (price * countWeightType + price * countWeightType * discount * 0.01);
        }
    }, []);
    const itemPrice = price * countWeightType;
    return (React.createElement(React.Fragment, null, discount === 0 ? (React.createElement(Text, null,
        price * countWeightType,
        ",00 \u20BD")) : (React.createElement("div", { className: styles.Price },
        React.createElement(Text, null,
            itemPrice,
            ",00 \u20BD"),
        React.createElement(Text, null, "/"),
        React.createElement(Text, { view: "secondary", size: "xs", style: { textDecoration: "line-through" } }, `${itemWithDiscountPrice},00 ₽`)))));
};
export default CatalogItemPrice;
//# sourceMappingURL=CatalogItemPrice.js.map