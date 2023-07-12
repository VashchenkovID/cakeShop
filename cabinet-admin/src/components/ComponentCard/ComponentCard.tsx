import React from 'react';
import styles from './ComponentCard.module.styl';
import cn from 'classnames/bind';

interface IComponentProps {
  isActive: boolean;
}
const cx = cn.bind(styles);
const ComponentCard: React.FC<IComponentProps> = ({ children, isActive }) => {
  return (
    <div
      className={cx(styles.ComponentCard, {
        active: isActive,
      })}
    >
      {children}
    </div>
  );
};

export default ComponentCard;
