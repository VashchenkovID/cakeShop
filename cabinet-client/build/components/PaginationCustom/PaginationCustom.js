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
const PaginationCustom = (props) => {
    const { items = defaultPaginationItems, total, pagination, setPagination, } = props;
    const { width } = useResize();
    const totalPages = useMemo(() => Math.ceil(total / pagination.perPage), [pagination.perPage, total]);
    const selectDisabledProps = useMemo(() => {
        if (total <= pagination.perPage) {
            return {
                disabled: true,
                value: total,
            };
        }
        else
            return;
    }, [pagination.perPage, total]);
    const onChangeCurrentPage = (value) => {
        setPagination((prev) => ({ ...prev, page: prev.page + value }));
    };
    return (React.createElement("div", { className: cx(styles.PaginationItemsFooter, props.className) },
        React.createElement("div", { className: styles.selectContainer },
            React.createElement(Select, { form: "round", size: "xs", className: styles.select, items: items, getItemKey: (item) => item, getItemLabel: (item) => item.toString(), value: pagination.perPage, onChange: ({ value }) => setPagination((prev) => value ? { ...prev, page: 1, perPage: value } : prev), ...selectDisabledProps }),
            width >= 500 && React.createElement(Text, { size: "xs" }, `из ${total}`)),
        React.createElement("div", { className: styles.actions },
            React.createElement(Button, { size: "xs", form: "round", view: pagination.page === 1 ? "ghost" : "primary", iconLeft: IconArrowLeft, onClick: onChangeCurrentPage.bind(0, -1), disabled: pagination.page === 1 }),
            React.createElement("div", { className: styles.actionsPage },
                React.createElement(Text, { size: "xs" }, pagination.page)),
            React.createElement(Button, { size: "xs", form: "round", view: pagination.page === totalPages || !totalPages ? "ghost" : "primary", disabled: pagination.page === totalPages || !totalPages, iconLeft: IconArrowRight, onClick: onChangeCurrentPage.bind(0, 1) }))));
};
export default PaginationCustom;
//# sourceMappingURL=PaginationCustom.js.map