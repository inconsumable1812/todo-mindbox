import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Todo } from './Todo';

describe('Todo component', () => {
  it('render', () => {
    render(<Todo />);
    const addButton = screen.getByText('Добавить');
    expect(addButton).toBeInTheDocument();
  });

  it('empty todo', () => {
    render(<Todo />);
    const checkbox = screen.queryByRole('checkbox');
    expect(checkbox).toBeNull();
  });

  it('if input empty', () => {
    render(<Todo />);
    const input = screen.getByPlaceholderText('Название задачи');

    fireEvent.input(input, { target: { value: '     ' } });
    fireEvent.submit(input);
    const checkbox = screen.queryByRole('checkbox');
    expect(checkbox).toBeNull();
  });

  it('todos with 1 item', () => {
    render(<Todo />);
    const input = screen.getByPlaceholderText('Название задачи');
    fireEvent.input(input, { target: { value: 'Задача 1' } });
    fireEvent.submit(input);
    const checkbox = screen.queryByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('todos with 2 active and 1 done task', () => {
    render(<Todo />);
    const input = screen.getByPlaceholderText('Название задачи');
    fireEvent.input(input, { target: { value: 'Задача 1' } });
    fireEvent.submit(input);
    fireEvent.input(input, { target: { value: 'Задача 2' } });
    fireEvent.submit(input);
    fireEvent.input(input, { target: { value: 'Задача 3' } });
    fireEvent.submit(input);

    const checkboxArray = screen.queryAllByRole('checkbox');
    const task2 = checkboxArray[1];
    fireEvent.click(task2);
    expect(task2).toBeChecked();
  });

  it('toggle to only done tasks', () => {
    render(<Todo />);
    const input = screen.getByPlaceholderText('Название задачи');
    fireEvent.input(input, { target: { value: 'Задача 1' } });
    fireEvent.submit(input);
    fireEvent.input(input, { target: { value: 'Задача 2' } });
    fireEvent.submit(input);
    fireEvent.input(input, { target: { value: 'Задача 3' } });
    fireEvent.submit(input);

    let checkboxArray = screen.queryAllByRole('checkbox');
    const task2 = checkboxArray[1];
    const task3 = checkboxArray[2];
    fireEvent.click(task2);
    fireEvent.click(task3);

    const doneButton = screen.getByText('завершенные');
    fireEvent.click(doneButton);

    checkboxArray = screen.queryAllByRole('checkbox');
    expect(checkboxArray.length).toBe(2);
  });

  it('toggle to only active tasks', () => {
    render(<Todo />);
    const input = screen.getByPlaceholderText('Название задачи');
    fireEvent.input(input, { target: { value: 'Задача 1' } });
    fireEvent.submit(input);
    fireEvent.input(input, { target: { value: 'Задача 2' } });
    fireEvent.submit(input);
    fireEvent.input(input, { target: { value: 'Задача 3' } });
    fireEvent.submit(input);

    let checkboxArray = screen.queryAllByRole('checkbox');
    const task2 = checkboxArray[1];
    const task3 = checkboxArray[2];
    fireEvent.click(task2);
    fireEvent.click(task3);

    const activeButton = screen.getByText('активные');
    fireEvent.click(activeButton);

    checkboxArray = screen.queryAllByRole('checkbox');
    expect(checkboxArray.length).toBe(1);
  });

  it('toggle first to only active tasks, then to all tasks', () => {
    render(<Todo />);
    const input = screen.getByPlaceholderText('Название задачи');
    fireEvent.input(input, { target: { value: 'Задача 1' } });
    fireEvent.submit(input);
    fireEvent.input(input, { target: { value: 'Задача 2' } });
    fireEvent.submit(input);
    fireEvent.input(input, { target: { value: 'Задача 3' } });
    fireEvent.submit(input);

    let checkboxArray = screen.queryAllByRole('checkbox');
    const task2 = checkboxArray[1];
    const task3 = checkboxArray[2];
    fireEvent.click(task2);
    fireEvent.click(task3);

    const activeButton = screen.getByText('активные');
    fireEvent.click(activeButton);

    checkboxArray = screen.queryAllByRole('checkbox');
    expect(checkboxArray.length).toBe(1);

    const allButton = screen.getByText('все');
    fireEvent.click(allButton);

    checkboxArray = screen.queryAllByRole('checkbox');
    expect(checkboxArray.length).toBe(3);
  });

  it('delete done tasks', () => {
    render(<Todo />);
    const input = screen.getByPlaceholderText('Название задачи');
    fireEvent.input(input, { target: { value: 'Задача 1' } });
    fireEvent.submit(input);
    fireEvent.input(input, { target: { value: 'Задача 2' } });
    fireEvent.submit(input);
    fireEvent.input(input, { target: { value: 'Задача 3' } });
    fireEvent.submit(input);

    let checkboxArray = screen.queryAllByRole('checkbox');
    const task2 = checkboxArray[1];
    const task3 = checkboxArray[2];
    fireEvent.click(task2);
    fireEvent.click(task3);

    const deleteDoneButton = screen.getByText('Удалить выполненные задачи');
    fireEvent.click(deleteDoneButton);

    checkboxArray = screen.queryAllByRole('checkbox');
    expect(checkboxArray.length).toBe(1);
  });
});
