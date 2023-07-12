import React from 'react';
import { TextField } from '@consta/uikit/TextField';
import styles from './Textarea.module.styl';
interface IComponentProps {
  text: string;
  form?:
    | 'default'
    | 'round'
    | 'defaultClear'
    | 'defaultBrick'
    | 'brick'
    | 'brickDefault'
    | 'brickClear'
    | 'brickRound'
    | 'roundClear'
    | 'roundBrick'
    | 'clearRound';
  size?: 's' | 'xs' | 'm' | 'l';
}

const Textarea: React.FC<IComponentProps> = ({ text, size, form }) => {
  return (
    <TextField
      value={text}
      size={size}
      form={form}
      type={'textarea'}
      disabled
      width={'full'}
      className={styles.field}
    />
  );
};

export default Textarea;
