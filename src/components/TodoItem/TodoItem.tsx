import { FC } from 'react';
import { Todo } from '../Todo/types';

import styles from './TodoItem.module.scss';

type Props = {
  todo: Todo;
  onChange: (id: number) => void;
};

const TodoItem: FC<Props> = ({ todo, onChange }) => {
  return (
    <label className={`${styles.label}`}>
      <input
        checked={todo.isDone}
        className={`${styles.input}`}
        onChange={() => onChange(todo.id)}
        type="checkbox"
      ></input>
      <span className={`${styles.checkbox}`}></span>
      <span className={`${styles.title}`}>{todo.text}</span>
    </label>
  );
};

export { TodoItem };
