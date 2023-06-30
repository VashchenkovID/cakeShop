import React, { useState } from "react";
import { RatingItemModel } from "src/api/models/RatingItemModel";
import { Text } from "@consta/uikit/Text";
import ComponentStyleWrapper from "../../../components/ComponentStyleWrapper/ComponentStyleWrapper";
import styles from "../DeviceView.module.styl";
import { Button } from "@consta/uikit/Button";
import DeviceViewRightSideItem from "../DeviceViewRightSideItem/DeviceViewRightSideItem";

interface IComponentProps {
  setPagination: React.Dispatch<
    React.SetStateAction<{ page: number; limit: number }>
  >;
  ratings: RatingItemModel[];
  count: number;
  width: number;
  isLoading: boolean;
}

const DeviceViewRightSide: React.FC<IComponentProps> = ({
  ratings,
  count,
  setPagination,
  width,
  isLoading,
}) => {
  const [isViewMore, setIsViewMore] = useState(false);
  return (
    <ComponentStyleWrapper>
      <div className={styles.Device__rightSide}>
        <div>
          <Text size={"2xl"}>Отзывы покупателей</Text>
          <Text size={"xs"} view={"secondary"}>
            {count !== 0
              ? `На десерт оставлено ${count} отзывов`
              : "На десерт еще не оставлены отзывы"}
          </Text>
        </div>

        {!isLoading && (
          <div>
            {width <= 800 ? (
              <div>
                {isViewMore ? (
                  <div className={styles.Device__rightSide__items}>
                    {ratings.length > 0 &&
                      ratings.map((item, index) => (
                        <DeviceViewRightSideItem
                          width={width}
                          item={item}
                          key={`${item.id}_${index}`}
                        />
                      ))}
                  </div>
                ) : (
                  <div className={styles.Device__rightSide__items}>
                    {ratings.length > 0 &&
                      ratings
                        .slice(0, 3)
                        .map((item, index) => (
                          <DeviceViewRightSideItem
                            width={width}
                            item={item}
                            key={`${item.id}_${index}`}
                          />
                        ))}
                  </div>
                )}
                {!isViewMore && (
                  <Button
                    label={"Показать еще"}
                    view={"clear"}
                    className={styles.ViewMore}
                    size={"xs"}
                    onClick={() => setIsViewMore(true)}
                  />
                )}
              </div>
            ) : (
              <div className={styles.Device__rightSide__items}>
                {ratings.length > 0 &&
                  ratings.map((item, index) => (
                    <DeviceViewRightSideItem
                      width={width}
                      item={item}
                      key={`${item.id}_${index}`}
                    />
                  ))}
              </div>
            )}
          </div>
        )}

        <div className={styles.Device__rightSide__action}>
          <Button
            label={"Загрузить еще"}
            size={width <= 500 ? "xs" : "s"}
            onClick={() =>
              setPagination((prevState) => {
                return { ...prevState, limit: prevState.limit + 10 };
              })
            }
            loading={isLoading}
            disabled={count === ratings.length}
          />
        </div>
      </div>
    </ComponentStyleWrapper>
  );
};

export default DeviceViewRightSide;
