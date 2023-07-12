import { AxiosResponse } from 'axios';
import { $authHost } from 'src/api/requests/index';
import { EnpointsEnum } from 'src/api/endpoints';
import { TodoModel } from 'src/api/models/TodoModel';

export interface EditTodoReqType {
  description: string;
  isReady: boolean;
}

export default {
  loadTodos: (): Promise<AxiosResponse<{ rows: TodoModel[] }>> =>
    $authHost.get(`${EnpointsEnum.GET_TODOS}`),
  loadTodoById: (id: string): Promise<AxiosResponse<TodoModel>> =>
    $authHost.get(`${EnpointsEnum.GET_TODOS}/${id}`),
  createTodo: (name: string): Promise<AxiosResponse<{ id: string }>> =>
    $authHost.post(`${EnpointsEnum.CREATE_TODOS}`, { description: name }),
  editTodo: (
    id: string,
    data: EditTodoReqType,
  ): Promise<AxiosResponse<TodoModel>> =>
    $authHost.put(`${EnpointsEnum.UPDATE_TODOS}/${id}`, data),
  removeTodo: (id: string): Promise<AxiosResponse<{ message: string }>> =>
    $authHost.delete(`${EnpointsEnum.DELETE_TODOS}/${id}`),
};
