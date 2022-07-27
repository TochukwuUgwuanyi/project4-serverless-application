/**
 * Fields in a request to create a single TODO item.
 */
export interface CreateTodoRequest {
  todoId?:string;
  name: string
  dueDate: string
}
