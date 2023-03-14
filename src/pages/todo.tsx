import { TodoForm } from '@/components/TodoForm';
import { TodoItem } from '@/components/TodoItem';
import { NOTIFICATION } from '@/constants';
import { isTodo, ITodo } from '@/interfaces/Todo';
import { MockTodoProvider } from '@/mockTodoProvider';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Loader, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useEffect, useReducer, useState } from 'react';

if (!process.env.NEXT_PUBLIC_HOST) throw new Error('API host has not been defined');

//const todoProvider = new TodoProvider(process.env.NEXT_PUBLIC_HOST);
const todoProvider = new MockTodoProvider();

interface TodoAction {
  type: 'ADD' | 'DELETE' | 'UPDATE' | 'INIT';
  [key: string]: any;
}

const todoReducer = (state: ITodo[], action: TodoAction): ITodo[] => {
  switch (action.type) {
    case 'ADD':
      if (!action.todo || !isTodo(action.todo)) throw new Error(`Missing property 'todo' on dispatched action`);
      return [...state, action.todo];
    case 'DELETE':
      if (!action.todo || !isTodo(action.todo)) throw new Error(`Missing property 'todo' on dispatched action`);
      return state.filter((todo) => todo.id !== action.todo.id);
    case 'UPDATE':
      if (!action.todo || !isTodo(action.todo)) throw new Error(`Missing property 'todo' on dispatched action`);
      const index = state.findIndex((todo) => todo.id === action.todo.id);
      return [...state.slice(0, index), action.todo, ...state.slice(index + 1, state.length)];
    case 'INIT':
      if (!action.todos || !Array.isArray(action.todos) || !action.todos.every((todo) => isTodo(todo)))
        throw new Error(`Missing property 'todos' on dispatched action`);
      return action.todos;
  }
};

export default function Todo() {
  const { user, isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [todos, dispatch] = useReducer(todoReducer, [] as ITodo[]);

  const [isTodosLoading, setIsTodosLoading] = useState(true);
  const [todosError, setTodoError] = useState<Error | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<ITodo | null>(null);

  const [opened, { open, close }] = useDisclosure(false);

  const editTodo = (todo: ITodo) => {
    setSelectedTodo(todo);
    open();
  };

  const createTodo = async (todo: ITodo) => {
    const result = await todoProvider.createTodo(todo);
    const success = result !== null;

    // if API success, add to state
    if (success) dispatch({ type: 'ADD', todo: result });

    if (success) notifications.show(NOTIFICATION.getCreateSuccess(todo.summary));
    else notifications.show(NOTIFICATION.getCreateFailure());
  };

  const updateTodo = async (todo: ITodo) => {
    const success = await todoProvider.updateTodo(todo);

    // if API success, update in state
    if (success) dispatch({ type: 'UPDATE', todo });

    if (success) notifications.show(NOTIFICATION.getUpdateSuccess());
    else notifications.show(NOTIFICATION.getUpdateFailure());
  };

  const deleteTodo = async (todo: ITodo) => {
    const success = await todoProvider.deleteTodo(todo.id);

    // if API success, remove from state
    if (success) dispatch({ type: 'DELETE', todo });

    if (success) notifications.show(NOTIFICATION.getDeleteSuccess(todo.summary));
    else notifications.show(NOTIFICATION.getDeleteFailure());
  };

  const submitTodo = async (todo: ITodo) => {
    // if todo ID is present, then we update, otherwise create a new todo
    if (todo.id) await updateTodo(todo as ITodo);
    else await createTodo(todo);
  };

  // load todo items
  // useEffect(() => {
  //   (async () => {
  //     const accessToken = await getAccessTokenSilently();
  //     todoProvider.setAccessToken(accessToken);

  //     try {
  //       const response = await todoProvider.getAllTodo();
  //       setIsTodosLoading(false);
  //       setTodos(response);
  //     } catch (error) {
  //       // set error state for client
  //       setTodoError(error as Error);
  //     }
  //   })();
  // }, [getAccessTokenSilently]);

  useEffect(() => {
    (async () => {
      try {
        const todos = await todoProvider.getAllTodo();
        setIsTodosLoading(false);
        dispatch({ type: 'INIT', todos });
      } catch (error) {
        setTodoError(error as Error);
      }
    })();
  }, []);

  const todoOutput = todos.map((todo) => <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} editTodo={editTodo} />);

  return (
    <main>
      <h1>Todo list</h1>
      {todosError && <p>{todosError.message}</p>}
      {isTodosLoading && <Loader />}
      {!isTodosLoading && <section>{todoOutput}</section>}
      <Button
        onClick={() => {
          setSelectedTodo(null);
          open();
        }}
      >
        Create
      </Button>
      <Modal opened={opened} onClose={close} title="Create Todo">
        <TodoForm submit={submitTodo} todo={selectedTodo} close={close} />
      </Modal>
    </main>
  );
}
