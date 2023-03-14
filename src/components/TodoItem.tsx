import { ITodo } from '@/interfaces/Todo';
import { Badge, Button, Collapse, Paper, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

interface TodoItemProps {
  todo: ITodo;
  deleteTodo: (todo: ITodo) => void;
  editTodo: (todo: ITodo) => void;
}

export const TodoItem = ({ todo, deleteTodo, editTodo }: TodoItemProps) => {
  const { id, summary, deadline, description } = todo;

  const [opened, { toggle }] = useDisclosure(false);

  const due = (
    <Badge variant="gradient" gradient={{ from: 'orange', to: 'red' }}>
      Due today
    </Badge>
  );

  return (
    <Paper shadow="xs" p="md" onClick={toggle}>
      <Title>{summary}</Title>
      {due}
      <Collapse in={opened}>
        <p>{description}</p>
        <Button onClick={() => deleteTodo(todo)}>Click</Button> <Button onClick={() => editTodo(todo)}>Edit</Button>{' '}
      </Collapse>
    </Paper>
  );
};
