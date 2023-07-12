import React from 'react';
import { Text } from '@consta/uikit/Text';
const MainWrapper = ({ children, title }) => {
    return (React.createElement("section", { style: { margin: '24px' } },
        React.createElement(Text, { size: '3xl' }, title),
        React.createElement("div", { style: { marginTop: '16px' } }, children)));
};
export default MainWrapper;
//# sourceMappingURL=MainWrapper.js.map