import React from 'react';
import { Text } from '@consta/uikit/Text';
import styles from './Informer.module.styl';
import ComponentStyleWrapper from '../ComponentStyleWrapper/ComponentStyleWrapper';
const InformerBadge = ({ text }) => {
    return (React.createElement(ComponentStyleWrapper, null,
        React.createElement("div", { className: styles.Wrapper },
            React.createElement(Text, { size: 's', align: 'center' }, text))));
};
export default InformerBadge;
//# sourceMappingURL=Informer.js.map