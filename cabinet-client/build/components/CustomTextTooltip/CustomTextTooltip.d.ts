import React from 'react';
export declare type TextViewType = 'link' | 'alert' | 'primary' | 'brand' | 'ghost' | 'linkMinor' | 'secondary' | 'success' | 'warning';
export declare type TextSizeType = 's' | '2xs' | 'xs' | 'm' | 'l' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
export declare type TextLintHeightType = 's' | '2xs' | 'xs' | 'm' | 'l';
export declare type TextDisplayType = 'inline' | 'block' | 'inlineBlock';
export declare type WeightType = 'black' | 'bold' | 'semibold' | 'regular' | 'light' | 'thin';
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
declare const CustomTextTooltip: React.FC<CustomTextTooltipProps>;
export default CustomTextTooltip;
