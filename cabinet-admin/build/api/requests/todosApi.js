import { $authHost } from 'src/api/requests/index';
export default {
    loadTodos: () => $authHost.get(`${"/todoList/getTodo" /* EnpointsEnum.GET_TODOS */}`),
    loadTodoById: (id) => $authHost.get(`${"/todoList/getTodo" /* EnpointsEnum.GET_TODOS */}/${id}`),
    createTodo: (name) => $authHost.post(`${"/todoList/create" /* EnpointsEnum.CREATE_TODOS */}`, { description: name }),
    editTodo: (id, data) => $authHost.put(`${"/todoList/update" /* EnpointsEnum.UPDATE_TODOS */}/${id}`, data),
    removeTodo: (id) => $authHost.delete(`${"/todoList/delete" /* EnpointsEnum.DELETE_TODOS */}/${id}`),
};
//# sourceMappingURL=todosApi.js.map