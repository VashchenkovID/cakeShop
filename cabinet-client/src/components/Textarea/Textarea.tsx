import React from "react";
import { TextField } from "@consta/uikit/TextField";
import styles from "./Textarea.module.styl";
import cn from "classnames/bind";
interface IComponentProps {
  text: string;
  className?: string;
  form?:
    | "default"
    | "round"
    | "defaultClear"
    | "defaultBrick"
    | "brick"
    | "brickDefault"
    | "brickClear"
    | "brickRound"
    | "roundClear"
    | "roundBrick"
    | "clearRound";
  size?: "s" | "xs" | "m" | "l";
}
const cx = cn.bind(styles);
const Textarea: React.FC<IComponentProps> = ({
  text,
  size,
  form,
  className,
}) => {
  return (
    <TextField
      value={text}
      size={size}
      form={form}
      type={"textarea"}
      disabled
      width={"full"}
      className={cx(styles.field, className)}
    />
  );
};

export default Textarea;
