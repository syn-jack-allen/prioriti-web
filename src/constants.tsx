import { IconAlertTriangle, IconCheck } from '@tabler/icons-react';

export const NOTIFICATION = {
  getCreateSuccess: (summary: string) => ({
    title: 'Created successfully',
    message: `You created '${summary}'`,
    color: 'green',
    icon: <IconCheck size="1.5rem" />,
  }),

  getDeleteSuccess: (summary: string) => ({
    title: 'Deleted successfully',
    message: `You deleted '${summary}'`,
    color: 'green',
    icon: <IconCheck size="1.5rem" />,
  }),

  getUpdateSuccess: () => ({
    title: 'Updated successfully',
    message: `You updated the todo item`,
    color: 'green',
    icon: <IconCheck size="1.5rem" />,
  }),

  getDeleteFailure: () => ({
    title: 'Uh oh!',
    message: 'Something went wrong and we could not delete this item',
    color: 'red',
    icon: <IconAlertTriangle size="1.5rem" />,
  }),

  getUpdateFailure: () => ({
    title: 'Uh oh!',
    message: 'Something went wrong and we could not update this item',
    color: 'red',
    icon: <IconAlertTriangle size="1.5rem" />,
  }),

  getCreateFailure: () => ({
    title: 'Uh oh!',
    message: 'Something went wrong and we could not create this item',
    color: 'red',
    icon: <IconAlertTriangle size="1.5rem" />,
  }),
};
