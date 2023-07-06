import { Button } from "@consta/uikit/Button";
import { Select } from "@consta/uikit/Select";
import { Text } from "@consta/uikit/Text";
import React, { useMemo } from "react";

import styles from "./PaginationCustom.module.styl";

import classNames from "classnames/bind";
import { IconArrowLeft } from "@consta/uikit/IconArrowLeft";
import { IconArrowRight } from "@consta/uikit/IconArrowRight";
import { useResize } from "src/hooks/useResize";

const cx = classNames.bind(styles);

const defaultPaginationItems = [20, 50, 100];

export interface PaginationStateType {
  page: number;
  perPage: number;
}

export interface IPaginationItemsFooterProps {
  items?: Array<number>;
  total: number;
  pagination: PaginationStateType;
  setPagination: React.Dispatch<React.SetStateAction<PaginationStateType>>;
  className?: string;
}

const PaginationCustom: React.FC<IPaginationItemsFooterProps> = (props) => {
  const {
    items = defaultPaginationItems,
    total,
    pagination,
    setPagination,
  } = props;
  const { width } = useResize();
  const totalPages = useMemo(
    () => Math.ceil(total / pagination.perPage),
    [pagination.perPage, total]
  );

  const selectDisabledProps = useMemo(() => {
    if (total <= pagination.perPage) {
      return {
        disabled: true,
        value: total,
      };
    } else return;
  }, [pagination.perPage, total]);

  const onChangeCurrentPage = (value: number) => {
    setPagination((prev) => ({ ...prev, page: prev.page + value }));
  };

  return (
    <div className={cx(styles.PaginationItemsFooter, props.className)}>
      <div className={styles.selectContainer}>
        <Select
          form="round"
          size="xs"
          className={styles.select}
          items={items}
          getItemKey={(item) => item}
          getItemLabel={(item) => item.toString()}
          value={pagination.perPage}
          onChange={({ value }) =>
            setPagination((prev) =>
              value ? { ...prev, page: 1, perPage: value } : prev
            )
          }
          {...selectDisabledProps}
        />
        {width >= 500 && <Text size="xs">{`из ${total}`}</Text>}
      </div>
      <div className={styles.actions}>
        <Button
          size="xs"
          form={"round"}
          view={pagination.page === 1 ? "ghost" : "primary"}
          iconLeft={IconArrowLeft}
          onClick={onChangeCurrentPage.bind(0, -1)}
          disabled={pagination.page === 1}
        />
        <div className={styles.actionsPage}>
          <Text size="xs">{pagination.page}</Text>
        </div>
        <Button
          size="xs"
          form={"round"}
          view={
            pagination.page === totalPages || !totalPages ? "ghost" : "primary"
          }
          disabled={pagination.page === totalPages || !totalPages}
          iconLeft={IconArrowRight}
          onClick={onChangeCurrentPage.bind(0, 1)}
        />
      </div>
    </div>
  );
};

export default PaginationCustom;
