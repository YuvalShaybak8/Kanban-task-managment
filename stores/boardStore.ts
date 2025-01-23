import { defineStore } from "pinia";

import type { Board, Column, Task } from "@/types/board";
import initialData from "@/data/database.json";

export const useBoardStore = defineStore("board", () => {
  // State
  const boards = ref<Board[]>(initialData.boards);
  const activeBoard = ref<Board>(initialData.boards[0]);
  const isCollapsed = ref(false);
  const isDarkMode = ref(false);

  // Actions
  const setActiveBoard = (id: number) => {
    boards.value = boards.value.map((board) => ({
      ...board,
      isActive: board.id === id,
    }));
    activeBoard.value =
      boards.value.find((board) => board.id === id) || boards.value[0];
  };

  const toggleSidebar = () => {
    isCollapsed.value = !isCollapsed.value;
  };

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
  };

  const addBoard = (board: Omit<Board, "isActive" | "columns">) => {
    boards.value = boards.value.map((b) => ({
      ...b,
      isActive: false,
    }));

    const newBoard = {
      ...board,
      isActive: true,
      columns: [],
    };
    boards.value.push(newBoard);
    activeBoard.value = newBoard;
    return newBoard.id;
  };

  const updateBoardName = (boardId: number, newName: string) => {
    const board = boards.value.find((b) => b.id === boardId);
    if (board) {
      board.name = newName;
      if (board.id === activeBoard.value.id) {
        activeBoard.value.name = newName;
      }
    }
  };

  const deleteBoard = (boardId: number) => {
    const index = boards.value.findIndex((b) => b.id === boardId);
    if (index !== -1) {
      boards.value.splice(index, 1);
      if (activeBoard.value.id === boardId) {
        activeBoard.value = boards.value[0];
        boards.value[0].isActive = true;
      }
    }
  };

  const addColumn = (boardId: number, column: Omit<Column, "tasks">) => {
    const board = boards.value.find((b) => b.id === boardId);
    if (board) {
      board.columns.push({
        ...column,
        tasks: [],
      });
    }
  };

  const updateColumn = (
    boardId: number,
    oldColumnName: string,
    newColumn: { name: string; label: string }
  ) => {
    const board = boards.value.find((b) => b.id === boardId);

    if (board) {
      const column = board.columns.find((c) => c.name === oldColumnName);

      if (column) {
        column.name = newColumn.name;
        column.label = newColumn.label;

        column.tasks.forEach((task) => {
          if (task.status === oldColumnName) {
            task.status = newColumn.name;
          }
        });

        if (board.id === activeBoard.value.id) {
          activeBoard.value = { ...board };
        }
      }
    }
  };

  const deleteColumn = (boardId: number, columnName: string) => {
    const board = boards.value.find((b) => b.id === boardId);
    if (board) {
      const columnIndex = board.columns.findIndex((c) => c.name === columnName);
      if (columnIndex !== -1) {
        board.columns.splice(columnIndex, 1);
        if (board.id === activeBoard.value.id) {
          activeBoard.value = { ...board };
        }
      }
    }
  };

  const addTask = (
    boardId: number,
    columnName: string,
    task: Omit<Task, "id">
  ) => {
    const board = boards.value.find((b) => b.id === boardId);
    if (board) {
      const column = board.columns.find((c) => c.name === columnName);
      if (column) {
        const newTask = {
          ...task,
          id: Date.now(),
        };
        column.tasks.push(newTask);
      }
    }
  };

  const updateTask = (taskId: number, updatedTask: Task) => {
    const board = boards.value.find((b) => b.id === activeBoard.value.id);
    if (board) {
      for (const column of board.columns) {
        const taskIndex = column.tasks.findIndex((t) => t.id === taskId);
        if (taskIndex !== -1) {
          if (column.name !== updatedTask.status) {
            column.tasks.splice(taskIndex, 1);
            const newColumn = board.columns.find(
              (c) => c.name === updatedTask.status
            );
            if (newColumn) {
              newColumn.tasks.push(updatedTask);
            }
          } else {
            column.tasks[taskIndex] = updatedTask;
          }
          if (board.id === activeBoard.value.id) {
            activeBoard.value = { ...board };
          }
          break;
        }
      }
    }
  };

  const deleteTask = (taskId: number) => {
    const board = boards.value.find((b) => b.id === activeBoard.value.id);
    if (board) {
      for (const column of board.columns) {
        const taskIndex = column.tasks.findIndex((t) => t.id === taskId);
        if (taskIndex !== -1) {
          column.tasks.splice(taskIndex, 1);
          if (board.id === activeBoard.value.id) {
            activeBoard.value = { ...board };
          }
          break;
        }
      }
    }
  };

  const updateTaskStatus = (taskId: number, newStatus: string) => {
    const board = boards.value.find((b) => b.id === activeBoard.value.id);
    if (!board) return;

    let task: Task | null = null;
    let sourceColumn: string | null = null;

    for (const column of board.columns) {
      const foundTask = column.tasks.find((t) => t.id === taskId);
      if (foundTask) {
        task = foundTask;
        sourceColumn = column.name;
        break;
      }
    }

    if (task && sourceColumn && sourceColumn !== newStatus) {
      const sourceColumnObj = board.columns.find(
        (col) => col.name === sourceColumn
      );
      if (sourceColumnObj) {
        sourceColumnObj.tasks = sourceColumnObj.tasks.filter(
          (t) => t.id !== taskId
        );
      }

      const targetColumn = board.columns.find((col) => col.name === newStatus);
      if (targetColumn) {
        task.status = newStatus;
        targetColumn.tasks.push(task);
      }

      if (board.id === activeBoard.value.id) {
        activeBoard.value = { ...board };
      }
    }
  };

  const updateSubtask = (
    taskId: number,
    subtaskIndex: number,
    isCompleted: boolean
  ) => {
    const board = boards.value.find((b) => b.id === activeBoard.value.id);
    if (board) {
      for (const column of board.columns) {
        const task = column.tasks.find((t) => t.id === taskId);
        if (task && task.subtasks[subtaskIndex]) {
          task.subtasks[subtaskIndex].isCompleted = isCompleted;
          if (board.id === activeBoard.value.id) {
            activeBoard.value = { ...board };
          }
          break;
        }
      }
    }
  };

  return {
    // State
    boards,
    activeBoard,
    isCollapsed,
    isDarkMode,
    // Actions
    setActiveBoard,
    toggleSidebar,
    toggleDarkMode,
    addBoard,
    updateBoardName,
    deleteBoard,
    addColumn,
    updateColumn,
    deleteColumn,
    addTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    updateSubtask,
  };
});
