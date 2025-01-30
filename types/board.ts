export interface Subtask {
  title: string;
  isCompleted: boolean;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  subtasks: Subtask[];
  status: string;
}

export interface Column {
  name: string;
  label: string;
  tasks: Task[];
}

export interface Board {
  id: number;
  name: string;
  columns: Column[];
}
