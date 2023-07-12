import React, { useMemo, useRef, useState } from 'react';
import { TodoModel } from 'src/api/models/TodoModel';
import { Checkbox } from '@consta/uikit/Checkbox';
import { Button } from '@consta/uikit/Button';
import { IconEdit } from '@consta/uikit/IconEdit';
import { IconTrash } from '@consta/uikit/IconTrash';
import { TextField } from '@consta/uikit/TextField';
import todosApi from 'src/api/requests/todosApi';
import styles from './MainPageTodoListItem.module.styl';
import cn from 'classnames/bind';
import { Text } from '@consta/uikit/Text';
import { IconClose } from '@consta/uikit/IconClose';

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
  const isReadyRef = useRef(item.isReady);
  const isNameRef = useRef(item.description);
  const [isEdit, setIsEdit] = useState(false);
  const [load, setLoad] = useState(false);
  const [name, setName] = useState('');
  const setEdit = () => {
    setName(item.description);
    setIsEdit((prev) => !prev);
  };
  const onOkEdit = async () => {
    setLoad(true);
    await todosApi
      .editTodo(item.id.toString(), {
        description: name === '' ? item.description : name,
        isReady: item.isReady,
      })
      .then(() => {
        setName('');
        setIsEdit(false);
        fetchTodos();
      })
      .finally(() => {
        setLoad(false);
      });
  };

  const isVisible = useMemo(() => {
    return (
      isReadyRef.current !== item.isReady ||
      isNameRef.current !== item.description
    );
  }, [item]);

  const onRemove = async () => {
    setLoad(true);
    await todosApi
      .removeTodo(item.id.toString())
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
        checked={item.isReady}
        onChange={({ checked }) => {
          setTodos((prevState) =>
            prevState.map((todo) => {
              if (todo.id === item.id) {
                return { ...todo, isReady: checked };
              } else return { ...todo };
            }),
          );
        }}
      />
      {isEdit ? (
        <div className={styles.Item__edit}>
          <TextField
            size={'s'}
            width={'full'}
            placeholder={'Введите заметку'}
            value={name}
            onChange={({ value }) => {
              setTodos((prevState) =>
                prevState.map((todo) => {
                  if (todo.id === item.id) {
                    return { ...todo, description: value || ''};
                  } else return { ...todo };
                }),
              );
              setName(value || '');
            }}
          />
        </div>
      ) : (
        <Text
          className={cx(styles.Item__description, {
            isCrossed: item.isReady,
          })}
        >
          {item.description}
        </Text>
      )}
      <div className={styles.Item__actions}>
        <Button
          size={'s'}
          iconLeft={!isEdit ? IconEdit : IconClose}
          onClick={setEdit}
        />
        <Button
          size={'s'}
          iconLeft={IconTrash}
          loading={load}
          onClick={onRemove}
        />
        {isVisible && <Button size={'s'} label={'ok'} onClick={onOkEdit} />}
      </div>
    </div>
  );
};

export default React.memo(MainPageTodoListItem);
