import React from 'react';
import { TodoModel } from 'src/api/models/TodoModel';
interface IComponentProps {
    item: TodoModel;
    setTodos: React.Dispatch<React.SetStateAction<TodoModel[]>>;
    fetchTodos: () => void;
    index: number;
}
declare const _default: React.NamedExoticComponent<IComponentProps>;
export default _default;
