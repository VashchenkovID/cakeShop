import React, { useEffect, useState } from 'react';
import useRequest from 'src/hooks/useRequest';
import todosApi from 'src/api/requests/todosApi';
import MainPageTodoListItem from 'src/pages/MainPage/MainPageTodoList/MainPageTodoListItem/MainPageTodoListItem';
import { Button } from '@consta/uikit/Button';
import { TextField } from '@consta/uikit/TextField';
import ScreenLoader from 'src/components/ScreenLoader/ScreenLoader';
import { Text } from '@consta/uikit/Text';
import styles from './MainPageTodoList.module.styl';
const MainPageTodoList = () => {
    const [todos, setTodos] = useState([]);
    const [isCreate, setIsCreate] = useState(false);
    const [load, setLoad] = useState(false);
    const [name, setName] = useState('');
    const { load: fetchTodos, isLoading } = useRequest(todosApi.loadTodos, (data) => {
        if (data) {
            setTodos(data.data.rows);
        }
    });
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
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: styles.List },
            React.createElement("div", { className: styles.List__header },
                React.createElement(Text, { size: 'l' }, "\u041D\u0430\u043F\u043E\u043C\u0438\u043D\u0430\u043D\u0438\u044F"),
                React.createElement(Button, { label: 'Создать', size: 's', onClick: openCreate })),
            isCreate && (React.createElement(React.Fragment, null,
                React.createElement(TextField, { size: 's', value: name, onChange: ({ value }) => setName(value || '') }),
                React.createElement(Button, { size: 's', label: '+', disabled: name === '', onClick: onSave, loading: load })))),
        React.createElement("div", { className: styles.List__rows }, !isLoading &&
            todos.length > 0 &&
            todos.map((item, index) => (React.createElement(MainPageTodoListItem, { index: index, key: `${item.id}_${index}`, setTodos: setTodos, item: item, fetchTodos: fetchTodos })))),
        isLoading && React.createElement(ScreenLoader, null)));
};
export default React.memo(MainPageTodoList);
//# sourceMappingURL=MainPageTodoList.js.map