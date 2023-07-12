import React from 'react';
import styles from './ComponentStyleWrapper.module.styl';
const ComponentStyleWrapper = ({ children }) => {
    return React.createElement("div", { className: styles.Wrapper }, children);
};
export default ComponentStyleWrapper;
//# sourceMappingURL=ComponentStyleWrapper.js.map