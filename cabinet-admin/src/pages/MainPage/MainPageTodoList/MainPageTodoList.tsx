import React, { useEffect, useState } from 'react';
import useRequest from 'src/hooks/useRequest';
import todosApi from 'src/api/requests/todosApi';
import MainPageTodoListItem from 'src/pages/MainPage/MainPageTodoList/MainPageTodoListItem/MainPageTodoListItem';
import { TodoModel } from 'src/api/models/TodoModel';
import { Button } from '@consta/uikit/Button';
import { TextField } from '@consta/uikit/TextField';
import ScreenLoader from 'src/components/ScreenLoader/ScreenLoader';
import { Text } from '@consta/uikit/Text';
import styles from './MainPageTodoList.module.styl';

const MainPageTodoList: React.FC = () => {
  const [todos, setTodos] = useState<TodoModel[]>([]);
  const [isCreate, setIsCreate] = useState(false);
  const [load, setLoad] = useState(false);
  const [name, setName] = useState('');
  const { load: fetchTodos, isLoading } = useRequest(
    todosApi.loadTodos,
    (data) => {
      if (data) {
        setTodos(data.data.rows);
      }
    },
  );
  const openCreate = () => {
    setIsCreate((prev) => !prev);
  };

  const onSave = async () => {
    setLoad(true);
    await todosApi
      .createTodo(name)
      .then((r) => {
        if (r.data.id) {
          setName('');
          setIsCreate(false);
          fetchTodos();
        }
      })
      .finally(() => {
        setLoad(false);
      });
  };

  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <>
      <div className={styles.List}>
        <div className={styles.List__header}>
          <Text size={'l'}>Напоминания</Text>
          <Button label={'Создать'} size={'s'} onClick={openCreate} />
        </div>
        {isCreate && (
          <>
            <TextField
              size={'s'}
              value={name}
              onChange={({ value }) => setName(value || '')}
            />
            <Button
              size={'s'}
              label={'+'}
              disabled={name === ''}
              onClick={onSave}
              loading={load}
            />
          </>
        )}
      </div>
      <div className={styles.List__rows}>
        {!isLoading &&
          todos.length > 0 &&
          todos.map((item, index) => (
            <MainPageTodoListItem
              index={index}
              key={`${item.id}`}
              setTodos={setTodos}
              item={item}
              fetchTodos={fetchTodos}
            />
          ))}
      </div>
      {isLoading && <ScreenLoader />}
    </>
  );
};

export default React.memo(MainPageTodoList);
