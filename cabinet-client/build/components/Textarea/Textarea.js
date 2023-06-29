import React from "react";
import { TextField } from "@consta/uikit/TextField";
import styles from "./Textarea.module.styl";
import cn from "classnames/bind";
const cx = cn.bind(styles);
const Textarea = ({ text, size, form, className, }) => {
    return (React.createElement(TextField, { value: text, size: size, form: form, type: "textarea", disabled: true, width: "full", className: cx(styles.field, className) }));
};
export default Textarea;
//# sourceMappingURL=Textarea.js.map