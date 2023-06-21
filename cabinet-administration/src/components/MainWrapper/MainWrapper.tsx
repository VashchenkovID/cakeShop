import React from 'react';
import { Text } from '@consta/uikit/Text';

interface IComponentProps {
  title?: string;
}

const MainWrapper: React.FC<IComponentProps> = ({ children, title }) => {
  return (
    <section style={{ margin: '24px' }}>
      <Text size={'3xl'}>{title}</Text>
      <div style={{ marginTop: '16px' }}>{children}</div>
    </section>
  );
};

export default MainWrapper;
