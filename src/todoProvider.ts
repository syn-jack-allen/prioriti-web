import axios, { AxiosInstance, AxiosRequestConfig, isAxiosError } from 'axios';
import { ITodoProvider } from './interfaces/Provider';
import { CreateTodoResponse, GetAllTodoResponse, GetTodoResponse, ITodo, ITodoId, ITodoUpdate } from './interfaces/Todo';

export default class TodoProvider implements ITodoProvider {
  private axiosInstance: AxiosInstance | null = null;

  private axiosConfig: AxiosRequestConfig = {
    timeout: 1000,
  };

  constructor(baseUrl: string) {
    this.axiosConfig = {
      ...this.axiosConfig,
      baseURL: `${baseUrl}/todo`,
    };
  }

  setAccessToken(accessToken: string) {
    this.axiosConfig = {
      ...this.axiosConfig,
      timeout: 2000,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    this.axiosInstance = axios.create(this.axiosConfig);
  }

  async getAllTodo(): Promise<ITodo[]> {
    if (!this.axiosInstance) throw new Error('No authentication has been configured');

    try {
      const result = await this.axiosInstance.get<GetAllTodoResponse>('');

      return result.data.results;
    } catch (error) {
      if (!isAxiosError(error)) throw error;

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw error;
      } else if (error.request) {
        // throw new ClientTimeoutError('todo items');
        throw error;
      } else {
        throw error;
      }
    }
  }

  async getTodo(todoId: ITodoId): Promise<ITodo> {
    if (!this.axiosInstance) throw new Error('No authentication has been configured');

    try {
      const result = await this.axiosInstance.get<GetTodoResponse>(`/${todoId}`);

      return result.data;
    } catch (error) {
      if (!isAxiosError(error)) throw error;

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw error;
      } else if (error.request) {
        // throw new ClientTimeoutError('todo items');
        throw error;
      } else {
        throw error;
      }
    }
  }

  async createTodo(partialTodo: Omit<ITodo, 'id'>): Promise<ITodo> {
    if (!this.axiosInstance) throw new Error('No authentication has been configured');

    try {
      const result = await this.axiosInstance.post<CreateTodoResponse>('', {
        ...partialTodo,
      });

      const todo = { ...partialTodo, id: result.data.todoId };

      return todo;
    } catch (error) {
      if (!isAxiosError(error)) throw error;

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw error;
      } else if (error.request) {
        // throw new ClientTimeoutError('todo items');
        throw error;
      } else {
        throw error;
      }
    }
  }

  async updateTodo(todo: ITodoUpdate): Promise<boolean> {
    if (!this.axiosInstance) throw new Error('No authentication has been configured');

    try {
      const result = await this.axiosInstance.get<GetTodoResponse>(`/${todo.id}`);

      return true;
    } catch (error) {
      if (!isAxiosError(error)) throw error;

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw error;
      } else if (error.request) {
        // throw new ClientTimeoutError('todo items');
        throw error;
      } else {
        throw error;
      }
    }
  }

  async deleteTodo(todoId: string): Promise<boolean> {
    if (!this.axiosInstance) throw new Error('No authentication has been configured');

    try {
      // await this.axiosInstance.delete(`/${todoId}`);
      return false;
    } catch (error) {
      if (!isAxiosError(error)) throw error;

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw error;
      } else if (error.request) {
        // throw new ClientTimeoutError('todo items');
        throw error;
      } else {
        throw error;
      }
    }
  }
}
