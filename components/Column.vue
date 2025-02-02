<template>
  <div class="h-[calc(100vh-80px)] w-full overflow-auto">
    <div class="h-full w-full">
      <div class="h-full flex gap-6 p-6 w-max">
        <div
          v-for="column in currentBoard?.columns"
          :key="column.name"
          class="min-w-[280px] w-[280px] flex flex-col"
        >
          <div class="mb-3 flex items-center gap-3 group relative">
            <UiBadge
              class="w-[15px] h-[15px] rounded-full p-0"
              :style="{ backgroundColor: column.label }"
            />

            <span
              class="uppercase text-gray font-medium text-[11px] tracking-[2.4px]"
              >{{ column.name }} ({{ column.tasks.length }})</span
            >

            <UiDropdownMenu>
              <UiDropdownMenuTrigger
                class="opacity-0 group-hover:opacity-100 ms-auto transition-opacity data-[state=open]:opacity-100"
              >
                <Ellipsis class="text-gray hover:text-gray-500 size-7" />
              </UiDropdownMenuTrigger>

              <UiDropdownMenuContent
                class="bg-card w-[100px] -translate-x-[50px] translate-y-0"
              >
                <UiDropdownMenuItem
                  @click="handleEditColumn(column)"
                  class="text-gray text-[13px] cursor-pointer py-2"
                >
                  Edit
                </UiDropdownMenuItem>
                <UiDropdownMenuItem
                  @click="handleDeleteColumn(column)"
                  class="text-delete_button text-[13px] cursor-pointer py-2"
                >
                  Delete
                </UiDropdownMenuItem>
              </UiDropdownMenuContent>
            </UiDropdownMenu>
          </div>

          <div class="space-y-5 overflow-y-auto flex-1 no-scrollbar">
            <draggable
              v-model="column.tasks"
              :group="{ name: 'tasks', pull: true, put: true }"
              :animation="prefersReducedMotion ? 0 : 150"
              :class="{ 'cursor-grabbing': isDragging }"
              item-key="task.id"
              @change="(evt) => handleChange(evt, column.name)"
              @start="isDragging = true"
              @end="isDragging = false"
              class="space-y-5"
              ghost-class="ghost-item"
              drag-class="drag-item"
            >
              <template #item="{ element: task }">
                <UiCard
                  class="bg-card dark:bg-sidebar-background w-full text-start p-4 hover:opacity-80 cursor-pointer transition-all duration-200"
                  @click="openTaskDialog(task)"
                >
                  <h4 class="font-bold text-[15px] mb-2">{{ task.title }}</h4>
                  <p class="text-gray text-[11px] font-medium">
                    {{ getSubtasksCount(task) }} of {{ task.subtasks.length }}
                    subtasks
                  </p>
                </UiCard>
              </template>
            </draggable>
          </div>

          <TaskView
            v-if="selectedTask"
            :modelValue="isTaskDialogOpen"
            @update:modelValue="isTaskDialogOpen = $event"
            :task="selectedTask"
            :columns="columns"
          />
        </div>

        <CreateColumn
          v-if="currentBoard?.columns.length < 6"
          @column-created="addNewColumn"
        />

        <EditColumn
          v-if="showEditColumn"
          v-model="showEditColumn"
          :column="selectedColumn"
          @column-updated="updateColumn"
        />

        <DeleteColumn
          v-if="showDeleteColumn"
          v-model="showDeleteColumn"
          :column="selectedColumn"
          @column-deleted="deleteColumn"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBoardStore } from "../stores/boardStore";
import type { Task } from "@/types/board";
import { Ellipsis } from "lucide-vue-next";
import draggable from "vuedraggable";
import CreateColumn from "./CreateColumn.vue";
import TaskView from "./TaskView.vue";
import EditColumn from "./EditColumn.vue";
import DeleteColumn from "./DeleteColumn.vue";
import { useReducedMotion } from "@/composables/useReducedMotion";

const { prefersReducedMotion } = useReducedMotion();

const isDragging = ref(false);

const boardStore = useBoardStore();
const activeBoardId = computed(() => boardStore.activeBoardId);

// Get the current board using the ID
const currentBoard = computed(() =>
  boardStore.boards.find((board) => board.id === activeBoardId.value)
);

const showEditColumn = ref(false);
const showDeleteColumn = ref(false);
const selectedColumn = ref<any>(null);

const isTaskDialogOpen = ref(false);
const selectedTask = ref<Task | null>(null);

const columns = computed(() => currentBoard.value?.columns || []);

const handleChange = (evt: any, columnName: string) => {
  if (evt.added) {
    const { element: task } = evt.added;
    boardStore.updateTaskStatus(task.id, columnName);
  }
  if (evt.moved) {
    const { element: task } = evt.moved;
    boardStore.updateTaskStatus(task.id, columnName);
  }
};

const handleEditColumn = (column: any) => {
  selectedColumn.value = column;
  showEditColumn.value = true;
};

const handleDeleteColumn = (column: any) => {
  selectedColumn.value = column;
  showDeleteColumn.value = true;
};

const getSubtasksCount = (task: Task) => {
  return task.subtasks.filter((subtask) => subtask.isCompleted).length;
};

const addNewColumn = (newColumn: { name: string; color: string }) => {
  if (activeBoardId.value) {
    boardStore.addColumn(activeBoardId.value, {
      name: newColumn.name,
      label: newColumn.color,
    });
  }
};

const updateColumn = (updatedColumn: { name: string; label: string }) => {
  if (selectedColumn.value && activeBoardId.value) {
    boardStore.updateColumn(
      activeBoardId.value,
      selectedColumn.value.name,
      updatedColumn
    );
    showEditColumn.value = false;
    selectedColumn.value = null;
  }
};

const deleteColumn = () => {
  if (selectedColumn.value && activeBoardId.value) {
    boardStore.deleteColumn(activeBoardId.value, selectedColumn.value.name);
    showDeleteColumn.value = false;
  }
};

const openTaskDialog = (task: Task) => {
  selectedTask.value = task;
  isTaskDialogOpen.value = true;
};
</script>
