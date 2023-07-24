import React, { useMemo, useRef, useState } from "react";
import { TodoModel } from "src/api/models/TodoModel";
import { Checkbox } from "@consta/uikit/Checkbox";
import { Button } from "@consta/uikit/Button";
import { IconEdit } from "@consta/uikit/IconEdit";
import { IconTrash } from "@consta/uikit/IconTrash";
import { TextField } from "@consta/uikit/TextField";
import todosApi from "src/api/requests/todosApi";
import styles from "./MainPageTodoListItem.module.styl";
import cn from "classnames/bind";
import { Text } from "@consta/uikit/Text";
import { IconClose } from "@consta/uikit/IconClose";

interface IComponentProps {
  item: TodoModel;
  setTodos: React.Dispatch<React.SetStateAction<TodoModel[]>>;
  fetchTodos: () => void;
  index: number;
}

const cx = cn.bind(styles);

const MainPageTodoListItem: React.FC<IComponentProps> = ({
  item,
  setTodos,
  fetchTodos,
  index,
}) => {
  const [localTodo, setLocalTodo] = useState<TodoModel>(item);
  const isReadyRef = useRef(localTodo.isReady);
  const isNameRef = useRef(localTodo.description);
  const [isEdit, setIsEdit] = useState(false);
  const [load, setLoad] = useState(false);
  const [name, setName] = useState("");
  const setEdit = () => {
    setName(localTodo.description);
    setTodos((prevState) =>
      prevState.map((todo) => {
        if (todo.id === localTodo.id) {
          return { ...localTodo };
        } else return { ...todo };
      })
    );
    setIsEdit((prev) => !prev);
  };
  const onOkEdit = async () => {
    setLoad(true);
    await todosApi
      .editTodo(localTodo.id.toString(), {
        description: name === "" ? localTodo.description : name,
        isReady: localTodo.isReady,
      })
      .then(() => {
        setName("");
        setIsEdit(false);
        fetchTodos();
      })
      .finally(() => {
        setLoad(false);
      });
  };

  const isVisible = useMemo(() => {
    return (
      isReadyRef.current !== localTodo.isReady ||
      isNameRef.current !== localTodo.description
    );
  }, [localTodo]);
  const onRemove = async () => {
    setLoad(true);
    await todosApi
      .removeTodo(localTodo.id.toString())
      .then(() => {
        setIsEdit(false);
        fetchTodos();
      })
      .finally(() => {
        setLoad(false);
      });
  };

  return (
    <div className={styles.Item}>
      <Text>{index + 1}.</Text>
      <Checkbox
        checked={localTodo.isReady}
        onChange={({ checked }) => {
          setLocalTodo((prevState) => {
            return { ...prevState, isReady: checked };
          });
        }}
      />
      {isEdit ? (
        <div className={styles.Item__edit}>
          <TextField
            size={"s"}
            width={"full"}
            placeholder={"Введите заметку"}
            value={name}
            onChange={({ value }) => {
              setName(value || "");
              setLocalTodo((prev) => {
                return { ...prev, description: value || "" };
              });
            }}
          />
        </div>
      ) : (
        <Text
          className={cx(styles.Item__description, {
            isCrossed: localTodo.isReady,
          })}
        >
          {localTodo.description}
        </Text>
      )}
      <div className={styles.Item__actions}>
        <Button
          size={"s"}
          iconLeft={!isEdit ? IconEdit : IconClose}
          onClick={setEdit}
        />
        <Button
          size={"s"}
          iconLeft={IconTrash}
          loading={load}
          onClick={onRemove}
        />
        {isVisible && <Button size={"s"} label={"ok"} onClick={onOkEdit} />}
      </div>
    </div>
  );
};

export default React.memo(MainPageTodoListItem);
