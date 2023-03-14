import { ITodo } from '@/interfaces/Todo';
import { Button, createStyles, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';

interface TodoFormProps {
  todo: ITodo | null;
  submit: (todo: ITodo) => void;
  close: () => void;
}

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
  },

  input: {
    height: 'auto',
    paddingTop: 18,
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1,
  },
}));

const getToday = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
};

export const TodoForm = ({ todo, submit, close }: TodoFormProps) => {
  const { classes } = useStyles();

  console.log('form', todo);

  // get date of today at midnight
  const today = getToday();

  const form = useForm({
    initialValues: {
      id: todo ? todo.id : '',
      summary: todo ? todo.summary : '',
      description: todo ? todo.description : '',
      deadline: todo ? new Date(todo.deadline) : new Date(),
    },
    validate: {
      id: (value) => null,
      summary: (value) => (value.length > 0 ? null : 'Summary cannot be empty'),
      description: (value) => (value.length < 1000 ? null : 'Description cannot be larger than 1000 characters'),
      deadline: (value) => (value >= today ? null : 'The deadline must be in the future'),
    },
  });

  const onSubmit = (values: typeof form.values) => {
    const formatted = {
      ...values,
      color: '',
      deadline: values.deadline.getTime(),
    };

    console.log('submit', formatted);

    submit(formatted);
    close();
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <TextInput label="Summary" placeholder="Pickup two pints of milk" classNames={classes} {...form.getInputProps('summary')} />
      <TextInput
        label="Description"
        placeholder="How could I describe it any better? I need to leave the house, find a store, and purchase milk!"
        classNames={classes}
        {...form.getInputProps('description')}
      />
      <DatePicker
        label="Deadline"
        placeholder="When do you want this done by?"
        clearable="false"
        classNames={classes}
        {...form.getInputProps('deadline')}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};
