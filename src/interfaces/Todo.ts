export interface ITodo {
  id: string;
  summary: string;
  description: string;
  deadline: number;
  color: string;
}

export const isTodo = (todo: unknown): todo is ITodo =>
  !!todo &&
  typeof todo === 'object' &&
  'id' in todo &&
  typeof todo.id === 'string' &&
  'summary' in todo &&
  typeof todo.summary === 'string' &&
  'description' in todo &&
  typeof todo.description === 'string' &&
  'deadline' in todo &&
  typeof todo.deadline === 'number' &&
  'color' in todo &&
  typeof todo.color === 'string';

export type ITodoId = ITodo['id'];

export type ITodoCreate = Omit<ITodo, 'id'>;

export type ITodoPartial = Partial<ITodo>;

export interface ITodoUpdate extends ITodoPartial {
  id: string;
}

export interface GetAllTodoResponse {
  results: ITodo[];
  pageNumber: number;
  pageSize: number;
  totalResults: number;
}

export type GetTodoResponse = ITodo;

export interface CreateTodoResponse {
  todoId: string;
}
