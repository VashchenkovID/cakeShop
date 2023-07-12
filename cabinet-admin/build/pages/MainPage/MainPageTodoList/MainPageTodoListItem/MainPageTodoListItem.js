import React, { useMemo, useRef, useState } from 'react';
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
const cx = cn.bind(styles);
const MainPageTodoListItem = ({ item, setTodos, fetchTodos, index, }) => {
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
        return (isReadyRef.current !== item.isReady ||
            isNameRef.current !== item.description);
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
    return (React.createElement("div", { className: styles.Item },
        React.createElement(Text, null,
            index + 1,
            "."),
        React.createElement(Checkbox, { checked: item.isReady, onChange: ({ checked }) => {
                setTodos((prevState) => prevState.map((todo) => {
                    if (todo.id === item.id) {
                        return { ...todo, isReady: checked };
                    }
                    else
                        return { ...todo };
                }));
            } }),
        isEdit ? (React.createElement("div", { className: styles.Item__edit },
            React.createElement(TextField, { size: 's', width: 'full', placeholder: 'Введите заметку', value: name, onChange: ({ value }) => {
                    setTodos((prevState) => prevState.map((todo) => {
                        if (todo.id === item.id) {
                            return { ...todo, description: value || '' };
                        }
                        else
                            return { ...todo };
                    }));
                    setName(value || '');
                } }))) : (React.createElement(Text, { className: cx(styles.Item__description, {
                isCrossed: item.isReady,
            }) }, item.description)),
        React.createElement("div", { className: styles.Item__actions },
            React.createElement(Button, { size: 's', iconLeft: !isEdit ? IconEdit : IconClose, onClick: setEdit }),
            React.createElement(Button, { size: 's', iconLeft: IconTrash, loading: load, onClick: onRemove }),
            isVisible && React.createElement(Button, { size: 's', label: 'ok', onClick: onOkEdit }))));
};
export default React.memo(MainPageTodoListItem);
//# sourceMappingURL=MainPageTodoListItem.js.map