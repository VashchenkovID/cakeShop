import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames/bind';
import styles from './CustomTextTooltip.module.styl';
import { withTooltip } from '@consta/uikit/withTooltip';
import { Text } from '@consta/uikit/Text';
const cx = cn.bind(styles);
const CustomTextTooltip = React.memo(({ text, tooltipText, className, textView, size = 's', lineHeight = 'm', oneRowHeight = 25, weight = null, lineClamp = 3, style, }) => {
    const offsetHeight = oneRowHeight * lineClamp;
    const TextWithTooltip = withTooltip({
        direction: 'upCenter',
        possibleDirections: ['upRight'],
        style: { WebkitLineClamp: lineClamp },
    })(Text);
    const [isTruncate, setTruncate] = useState(false);
    const [isChecked, setChecked] = useState(false);
    const ref = useRef(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        setChecked(true);
        if (ref.current && ref.current.offsetHeight > offsetHeight)
            setTruncate(true);
    });
    if (isChecked && !isTruncate && !tooltipText)
        return (React.createElement(Text, { size: size, lineHeight: lineHeight, 
            //@ts-ignore
            weight: weight, ref: ref, view: textView, style: style, className: cx(styles.indent, className) }, text));
    return (React.createElement(TextWithTooltip, { lineHeight: lineHeight, className: cx(styles.indentTooltip, className), size: size, view: textView, tooltipProps: {
            content: (React.createElement("div", { className: styles.root },
                React.createElement(Text, { size: "xs", lineHeight: "xs", className: styles.text }, tooltipText || text))),
            size: 'l',
        } },
        React.createElement(Text, { size: size, lineHeight: lineHeight, className: styles.textTooltip, style: style }, text)));
});
CustomTextTooltip.displayName = ' CustomTextTooltip';
export default CustomTextTooltip;
//# sourceMappingURL=CustomTextTooltip.js.map