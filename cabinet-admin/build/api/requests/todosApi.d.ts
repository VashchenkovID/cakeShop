import { AxiosResponse } from 'axios';
import { TodoModel } from 'src/api/models/TodoModel';
export interface EditTodoReqType {
    description: string;
    isReady: boolean;
}
declare const _default: {
    loadTodos: () => Promise<AxiosResponse<{
        rows: TodoModel[];
    }>>;
    loadTodoById: (id: string) => Promise<AxiosResponse<TodoModel>>;
    createTodo: (name: string) => Promise<AxiosResponse<{
        id: string;
    }>>;
    editTodo: (id: string, data: EditTodoReqType) => Promise<AxiosResponse<TodoModel>>;
    removeTodo: (id: string) => Promise<AxiosResponse<{
        message: string;
    }>>;
};
export default _default;
