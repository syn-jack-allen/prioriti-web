import { v4 as uuidv4 } from 'uuid';
import { ITodoProvider } from './interfaces/Provider';
import { ITodo, ITodoId, ITodoUpdate } from './interfaces/Todo';

export class MockTodoProvider implements ITodoProvider {
  private todos: ITodo[] = [
    {
      id: uuidv4(),
      summary: 'Get milk',
      description: 'Find a cow and milk it!',
      deadline: Date.parse('2023-03-15'),
      color: 'red',
    },
    {
      id: uuidv4(),
      summary: 'Return tuxdedo',
      description: 'Return the tuxedo I borrowed so I can get my money back',
      deadline: Date.parse('2023-03-07'),
      color: 'blue',
    },
  ];

  async getAllTodo() {
    return this.todos;
  }

  async getTodo(todoId: ITodoId) {
    return this.todos.find((todo) => todo.id === todoId) || null;
  }

  async createTodo(todo: Omit<ITodo, 'id'>) {
    const newTodo = { id: uuidv4(), ...todo };
    this.todos.push(newTodo);
    return newTodo;
  }

  async updateTodo(update: ITodoUpdate) {
    const todo = await this.getTodo(update.id);
    if (!todo) return false;

    if (update.summary) todo.summary = update.summary;
    if (update.description) todo.description = update.description;
    if (update.deadline) todo.deadline = update.deadline;
    if (update.color) todo.color = update.color;

    return true;
  }

  async deleteTodo(todoId: ITodoId) {
    this.todos = this.todos.filter((todo) => todo.id !== todoId);

    return true;
  }
}
