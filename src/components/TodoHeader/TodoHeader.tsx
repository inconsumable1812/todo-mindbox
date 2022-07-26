import { FC } from 'react';
import { Todo, TodoShowType } from '../Todo/types';

import styles from './TodoHeader.module.scss';

type Props = {
  todoShowType: TodoShowType;
  onSetAll: () => void;
  onSetActive: () => void;
  onSetDone: () => void;
  onRemoveDoneTodos: () => void;
  todos: Todo[];
};

const TodoHeader: FC<Props> = ({
  todoShowType,
  onSetAll,
  onSetActive,
  onSetDone,
  onRemoveDoneTodos,
  todos
}) => {
  const allButtonClassName =
    todoShowType === 'all'
      ? `${styles.active} ${styles.button}`
      : `${styles.button}`;
  const activeButtonClassName =
    todoShowType === 'active'
      ? `${styles.active}  ${styles.button}`
      : `${styles.button}`;
  const doneButtonClassName =
    todoShowType === 'done'
      ? `${styles.active}  ${styles.button}`
      : `${styles.button}`;

  const activeTodos = todos.filter((todo) => todo.isDone === false);

  return (
    <div className={`${styles.root}`}>
      <p>Задач осталось: {activeTodos.length}</p>
      <div className={`${styles.buttons}`}>
        <button className={allButtonClassName} onClick={onSetAll}>
          все
        </button>
        <button className={activeButtonClassName} onClick={onSetActive}>
          активные
        </button>
        <button className={doneButtonClassName} onClick={onSetDone}>
          завершенные
        </button>
      </div>
      <button onClick={onRemoveDoneTodos}>Удалить выполненные задачи</button>
    </div>
  );
};

export { TodoHeader };
