export type Todo = {
  id: number;
  text: string;
  isDone: boolean;
};

export type TodoShowType = 'all' | 'done' | 'active';
