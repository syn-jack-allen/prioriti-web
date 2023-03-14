// export inter

import { ITodo, ITodoId, ITodoUpdate } from './Todo';

export interface ITodoProvider {
  /**
   * Gets all todo items.
   * @returns An array of all todo items.
   */
  getAllTodo: () => Promise<ITodo[]>;

  /**
   * Get a single todo item by its ID. If no todo item
   * exists with that ID, returns null.
   * @param todoId The todo ID to retrieve.
   * @returns The todo item or null if one doesn't exist with the ID.
   */
  getTodo: (todoId: ITodoId) => Promise<ITodo | null>;

  /**
   * Used to create a new todo item. These items are not expected
   * to have a todo ID as this is created on the server.
   * @param todo The todo object.
   * @returns A promise that resolves with the new todo item or null if creation failed.
   */
  createTodo: (todo: Omit<ITodo, 'id'>) => Promise<ITodo | null>;

  /**
   * Updates a existing todo item. The todo object requires an ID to update.
   * For properties that don't need to change, they can be left as undefined
   * in the object.
   * @param todo The todo object with a required ID.
   * @returns A promise that resolves with a success or failure boolean.
   */
  updateTodo: (todo: ITodoUpdate) => Promise<boolean>;

  /**
   * Delete a todo by its ID.
   * @param todoId The todo ID to delete.
   * @returns A promise that resolves with a success or failure boolean.
   */
  deleteTodo: (todoId: ITodoId) => Promise<boolean>;
}
