import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames/bind';
import styles from './CustomTextTooltip.module.styl';
import { withTooltip } from '@consta/uikit/withTooltip';
import { Text } from '@consta/uikit/Text';

export type TextViewType =
  | 'link'
  | 'alert'
  | 'primary'
  | 'brand'
  | 'ghost'
  | 'linkMinor'
  | 'secondary'
  | 'success'
  | 'warning';

export type TextSizeType =
  | 's'
  | '2xs'
  | 'xs'
  | 'm'
  | 'l'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl';

export type TextLintHeightType = 's' | '2xs' | 'xs' | 'm' | 'l';

export type TextDisplayType = 'inline' | 'block' | 'inlineBlock';

export type WeightType =
  | 'black'
  | 'bold'
  | 'semibold'
  | 'regular'
  | 'light'
  | 'thin';

export interface CustomTextTooltipProps {
  text: string | number;
  tooltipText?: string;
  className?: any;
  textView?: TextViewType;
  size?: TextSizeType;
  lineHeight?: TextLintHeightType;
  oneRowHeight?: number;
  display?: TextDisplayType;
  weight?: WeightType;
  lineClamp?: number;
  style?: React.CSSProperties | undefined;
}

const cx = cn.bind(styles);

const CustomTextTooltip: React.FC<CustomTextTooltipProps> = React.memo(
  ({
    text,
    tooltipText,
    className,
    textView,
    size = 's',
    lineHeight = 'm',
    oneRowHeight = 25,
    weight = null,
    lineClamp = 3,
    style,
  }) => {
    const offsetHeight = oneRowHeight * lineClamp;
    const TextWithTooltip: any = withTooltip({
      direction: 'upCenter',
      possibleDirections: ['upRight'],
      style: { WebkitLineClamp: lineClamp },
    })(Text);
    const [isTruncate, setTruncate] = useState<boolean>(false);
    const [isChecked, setChecked] = useState<boolean>(false);
    const ref = useRef<any>(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
      setChecked(true);
      if (ref.current && ref.current.offsetHeight > offsetHeight)
        setTruncate(true);
    });

    if (isChecked && !isTruncate && !tooltipText)
      return (
        <Text
          size={size}
          lineHeight={lineHeight}
          //@ts-ignore
          weight={weight}
          ref={ref}
          view={textView}
          style={style}
          className={cx(styles.indent, className)}
        >
          {text}
        </Text>
      );
    return (
      <TextWithTooltip
        lineHeight={lineHeight}
        className={cx(styles.indentTooltip, className)}
        size={size}
        view={textView}
        tooltipProps={{
          content: (
            <div className={styles.root}>
              <Text size="xs" lineHeight="xs" className={styles.text}>
                {tooltipText || text}
              </Text>
            </div>
          ),
          size: 'l',
        }}
      >
        <Text
          size={size}
          lineHeight={lineHeight}
          className={styles.textTooltip}
          style={style}
        >
          {text}
        </Text>
      </TextWithTooltip>
    );
  },
);

CustomTextTooltip.displayName = ' CustomTextTooltip';
export default CustomTextTooltip;
