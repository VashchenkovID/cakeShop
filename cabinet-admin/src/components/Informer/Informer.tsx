import React from 'react';
import { Text } from '@consta/uikit/Text';
import styles from './Informer.module.styl';
import ComponentStyleWrapper from '../ComponentStyleWrapper/ComponentStyleWrapper';

interface IComponentProps {
  text: string;
}

const InformerBadge: React.FC<IComponentProps> = ({ text }) => {
  return (
    <ComponentStyleWrapper>
      <div className={styles.Wrapper}>
        <Text size={'s'} align={'center'}>
          {text}
        </Text>
      </div>
    </ComponentStyleWrapper>
  );
};

export default InformerBadge;
