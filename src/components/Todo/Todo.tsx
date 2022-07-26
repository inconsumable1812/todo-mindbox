import { FC, SyntheticEvent, useState } from 'react';
import { TodoHeader } from '../TodoHeader/TodoHeader';
import { TodoItem } from '../TodoItem/TodoItem';

import styles from './Todo.module.scss';
import { Todo as TodoType, TodoShowType } from './types';

type Props = {};

const Todo: FC<Props> = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [todoShowType, setTodoShowType] = useState<TodoShowType>('all');
  const [value, setValue] = useState('');
  const handleInput = (e: SyntheticEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const addTodo = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim() === '') return;

    const newTodos: TodoType = {
      id: new Date().getTime(),
      text: value,
      isDone: false
    };
    setTodos((prev) => [...prev, newTodos]);
    setValue('');
  };

  const toggleIsDone = (id: number) => {
    setTodos([
      ...todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : { ...todo }
      )
    ]);
  };

  let filteredTodos = todos;

  switch (todoShowType) {
    case 'active':
      filteredTodos = todos.filter((todo) => todo.isDone === false);
      break;
    case 'done':
      filteredTodos = todos.filter((todo) => todo.isDone === true);
      break;
    default:
      filteredTodos = todos;
      break;
  }

  const handleSetAll = () => setTodoShowType('all');
  const handleSetActive = () => setTodoShowType('active');
  const handleSetDone = () => setTodoShowType('done');

  const removeDoneTodos = () => {
    setTodos([...todos.filter((todo) => todo.isDone === false)]);
  };

  return (
    <div className={`${styles.root}`}>
      <form className={`${styles.form}`} onSubmit={addTodo}>
        <input
          placeholder="Название задачи"
          value={value}
          onInput={handleInput}
          className={`${styles.input}`}
        ></input>
        <button className={`${styles.button}`}>Добавить</button>
      </form>

      <TodoHeader
        todoShowType={todoShowType}
        todos={todos}
        onSetActive={handleSetActive}
        onSetAll={handleSetAll}
        onSetDone={handleSetDone}
        onRemoveDoneTodos={removeDoneTodos}
      ></TodoHeader>

      <div className={`${styles.container}`}>
        {filteredTodos.length !== 0 ? (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              onChange={toggleIsDone}
              todo={todo}
            ></TodoItem>
          ))
        ) : (
          <p>Список задач пуст!</p>
        )}
      </div>
    </div>
  );
};

export { Todo };
