import React from 'react';
import { TextField } from '@consta/uikit/TextField';
import styles from './Textarea.module.styl';
const Textarea = ({ text, size, form }) => {
    return (React.createElement(TextField, { value: text, size: size, form: form, type: 'textarea', disabled: true, width: 'full', className: styles.field }));
};
export default Textarea;
//# sourceMappingURL=Textarea.js.map