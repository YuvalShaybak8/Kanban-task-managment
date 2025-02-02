import { defineStore } from "pinia";
import type { Board, BoardStore, Column, Task } from "@/types/board";
import initialData from "@/data/database.json";

export const useBoardStore = defineStore(
  "board",
  () => {
    // State
    const boards = ref<Board[]>(initialData.boards);
    const activeBoardId = ref<number | null>(boards.value[0]?.id || null);
    const isCollapsed = ref(false);

    const isActive = (id: number) => activeBoardId.value === id;

    // Actions
    const setActiveBoard = (id: number) => {
      activeBoardId.value = id;
    };

    const toggleSidebar = () => {
      isCollapsed.value = !isCollapsed.value;
    };

    const addBoard = (board: Omit<Board, "columns">) => {
      const maxId = Math.max(...boards.value.map((b) => b.id));
      const nextId = maxId + 1;

      const newBoard = {
        id: nextId,
        name: board.name,
        columns: [],
      };

      boards.value.push(newBoard);
      activeBoardId.value = nextId;
      return nextId;
    };

    const updateBoardName = (boardId: number, newName: string) => {
      const board = boards.value.find((b) => b.id === boardId);
      if (board) {
        board.name = newName;
      }
    };

    const deleteBoard = (boardId: number) => {
      const index = boards.value.findIndex((b) => b.id === boardId);
      if (index !== -1) {
        boards.value.splice(index, 1);
        if (activeBoardId.value === boardId) {
          // Set to first board if available, or null if no boards
          activeBoardId.value = boards.value[0]?.id || null;
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
        }
      }
    };

    const deleteColumn = (boardId: number, columnName: string) => {
      const board = boards.value.find((b) => b.id === boardId);
      if (board) {
        const columnIndex = board.columns.findIndex(
          (c) => c.name === columnName
        );
        if (columnIndex !== -1) {
          board.columns.splice(columnIndex, 1);
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
      const board = boards.value.find((b) => b.id === activeBoardId.value);
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
            break;
          }
        }
      }
    };

    const deleteTask = (taskId: number) => {
      const board = boards.value.find((b) => b.id === activeBoardId.value);
      if (board) {
        for (const column of board.columns) {
          const taskIndex = column.tasks.findIndex((t) => t.id === taskId);
          if (taskIndex !== -1) {
            column.tasks.splice(taskIndex, 1);
            break;
          }
        }
      }
    };

    const updateTaskStatus = (taskId: number, newStatus: string) => {
      const board = boards.value.find((b) => b.id === activeBoardId.value);
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

        const targetColumn = board.columns.find(
          (col) => col.name === newStatus
        );
        if (targetColumn) {
          task.status = newStatus;
          targetColumn.tasks.push(task);
        }
      }
    };

    const updateSubtask = (
      taskId: number,
      subtaskIndex: number,
      isCompleted: boolean
    ) => {
      const board = boards.value.find((b) => b.id === activeBoardId.value);
      if (board) {
        for (const column of board.columns) {
          const task = column.tasks.find((t) => t.id === taskId);
          if (task && task.subtasks[subtaskIndex]) {
            task.subtasks[subtaskIndex].isCompleted = isCompleted;
            break;
          }
        }
      }
    };

    return {
      // State
      boards,
      activeBoardId,
      isCollapsed,
      isActive,
      // Actions
      setActiveBoard,
      toggleSidebar,
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
  },
  {
    persist: {
      key: "kanban-store",
      storage: import.meta.client ? localStorage : null,
      pick: ["boards", "activeBoardId", "isCollapsed"],
    },
  }
);
