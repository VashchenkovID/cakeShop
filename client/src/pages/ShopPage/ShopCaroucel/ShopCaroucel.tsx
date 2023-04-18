import React, { useEffect, useMemo, useRef, useState } from 'react';
import { DeviceListModel } from 'src/api/models/DeviceListModel';
import styles from './ShopCaroucel.styl';
import cn from 'classnames/bind';

interface IComponentProps {
  items: DeviceListModel[];
  automatic?: boolean;
}

const cx = cn.bind(styles);

const ShopCaroucel: React.FC<IComponentProps> = ({ items, automatic }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timer>(null);

  const caroucelItems = useMemo(() => {
    if (items.length > 0) {
      return items.map((item, index) => {
        return { ...item, active: index === currentIndex, index: index };
      });
    }
  }, [items, currentIndex]);
  const switchSlide = (type: 'left' | 'right') => {
    if (type === 'left') {
      setCurrentIndex((prev) => {
        if (currentIndex === 0) {
          return items.length - 1;
        } else return prev - 1;
      });
    }
    if (type === 'right') {
      setCurrentIndex((prev) => {
        if (prev >= items.length - 1) {
          return 0;
        } else return prev + 1;
      });
    }
  };

  useEffect(() => {
    if (automatic) {
      intervalRef.current = setInterval(() => {
        switchSlide('right');
      }, 3000);
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [automatic]);
  return (
    <article>
      {caroucelItems &&
        caroucelItems.map((item, index) => (
          <>
            {item.active ? (
              <div className={styles.Caroucel} key={`${item.id}_${index}`}>
                <img
                  className={styles.Caroucel__img}
                  src={`${process.env.REACT_APP_IMAGE}${item.img}`}
                />
                <div className={styles.Caroucel__actions}>
                  {caroucelItems.map((itm, idx) => (
                    <div
                      className={cx(styles.Caroucel__actions__line, {
                        active: itm.active,
                      })}
                      key={idx}
                      // onClick={() => {
                      //   setCurrentIndex(itm.index);
                      // }}
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </>
        ))}
    </article>
  );
};

export default ShopCaroucel;
