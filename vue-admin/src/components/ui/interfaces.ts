import type {Component} from "vue";
import type {DesignToken, Nullable, PassThrough} from "@primevue/core";
import {InputTextPassThroughOptions} from "primevue/inputtext";
import type {PassThroughOptions} from "primevue/passthrough";
import {InputTypeHTMLAttribute} from "@vue/runtime-dom";

export interface MyButtonProps {
    /**
     * Inline style of the button.
     */
    style?: any;
    /**
     * Style class of the button.
     */
    class?: any;
    /**
     * Text of the button.
     */
    label?: string | undefined;
    /**
     * Name of the icon.
     */
    icon?: string | undefined;
    /**
     * Position of the icon.
     * @defaultValue left
     */
    iconPos?: 'left' | 'right' | 'top' | 'bottom' | undefined;
    /**
     * Style class of the icon.
     */
    iconClass?: string | object | undefined;
    /**
     * Value of the badge.
     */
    badge?: string | undefined;
    /**
     * Style class of the badge.
     */
    badgeClass?: string | object | undefined;

    /**
     * Whether the button is in loading state.
     * @defaultValue false
     */
    loading?: boolean | undefined;
    /**
     * Icon to display in loading state.
     */
    loadingIcon?: string | undefined;
    /**
     * Use to change the HTML tag of root element.
     * @defaultValue BUTTON
     */
    as?: string | Component | undefined;
    /**
     * When enabled, it changes the default rendered element for the one passed as a child element.
     * @defaultValue false
     */
    asChild?: boolean | undefined;
    /**
     *  Add a link style to the button.
     * @defaultValue false
     */
    link?: boolean | undefined;
    /**
     * Defines the style of the button.
     */
    severity?: 'secondary' | 'success' | 'info' | 'warn' | 'help' | 'danger' | 'contrast'
    /**
     * Add a shadow to indicate elevation.
     * @defaultValue false
     */
    raised?: boolean | undefined;
    /**
     * Add a circular border radius to the button.
     * @defaultValue false
     */
    rounded?: boolean | undefined;
    /**
     * Add a textual class to the button without a background initially.
     * @defaultValue false
     */
    text?: boolean | undefined;
    /**
     * Add a border class without a background initially.
     * @defaultValue false
     */
    outlined?: boolean | undefined;
    /**
     * Defines the size of the button.
     */
    size?: 'small' | 'large' | undefined;
    /**
     * Specifies the variant of the component.
     * @defaultValue undefined
     */
    variant?: 'outlined' | 'text' | 'link' | undefined;
    /**
     * When enabled, it removes component related styles in the core.
     * @defaultValue false
     */
    unstyled?: boolean;
}
export interface ITextFieldProps {
    modelValue?: Nullable<string>;
    defaultValue?: Nullable<string>;
    name?: string | undefined;
    size?: 'small' | 'large' | undefined | null;
    invalid?: boolean | undefined | null;
    variant?: 'outlined' | 'filled' | undefined | null;
    fluid?: boolean | undefined | null;
    formControl?: Record<string, any> | undefined;
    dt?: DesignToken<any>;
    pt?: PassThrough<InputTextPassThroughOptions>;
    ptOptions?: PassThroughOptions;
    unstyled?: boolean;
    label?:string;
    type?:InputTypeHTMLAttribute
}