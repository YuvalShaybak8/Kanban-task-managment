<template>
  <UiDialog
    :open="modelValue"
    @update:open="$emit('update:modelValue', $event)"
    class="focus:outline-none"
  >
    <UiDialogContent class="sm:max-w-[480px] bg-card !ring-0 !outline-none">
      <UiDialogHeader class="flex flex-row justify-between">
        <UiDialogTitle class="text-xl font-bold">{{
          task.title
        }}</UiDialogTitle>
        <UiDropdownMenu>
          <UiDropdownMenuTrigger class="rounded-full">
            <VerticalEllipsis class="text-gray" />
          </UiDropdownMenuTrigger>
          <UiDropdownMenuContent
            class="bg-card w-[100px] -translate-x-[60px] translate-y-2"
          >
            <UiDropdownMenuItem
              @click="handleEditClick"
              class="text-gray text-[13px] py-4 cursor-pointer"
            >
              Edit Task
            </UiDropdownMenuItem>
            <UiDropdownMenuItem
              @click="handleDeleteClick"
              class="text-delete_button text-[13px] py-4 cursor-pointer"
            >
              Delete Task
            </UiDropdownMenuItem>
          </UiDropdownMenuContent>
        </UiDropdownMenu>
      </UiDialogHeader>

      <div class="space-y-6">
        <p v-if="task.description" class="text-gray text-[13px] leading-6">
          {{ task.description }}
        </p>

        <div class="space-y-3">
          <h3 class="text-[12px] font-bold text-black">
            Subtasks ({{ completedSubtasks }} of {{ task.subtasks.length }})
          </h3>
          <div class="space-y-2">
            <div
              v-for="(subtask, index) in task.subtasks"
              :key="index"
              class="flex items-center bg-background p-3 rounded-md hover:bg-purple/30 transition-colors cursor-pointer group"
              @click="toggleSubtask(index)"
            >
              <div class="flex items-center mr-4">
                <div
                  class="w-4 h-4 border border-gray/25 rounded-sm flex items-center justify-center transition-colors"
                  :class="{ 'bg-purple border-purple': subtask.isCompleted }"
                >
                  <svg
                    v-if="subtask.isCompleted"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    class="w-5 h-5 text-white"
                  >
                    <path
                      fill="currentColor"
                      d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                    />
                  </svg>
                </div>
              </div>
              <span
                class="text-[12px] select-none transition-colors hover:text-black"
                :class="{ 'line-through text-gray': subtask.isCompleted }"
              >
                {{ subtask.title }}
              </span>
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-[12px] font-bold text-black">Current Status</h3>
          <UiSelect
            v-model="currentStatus"
            @update:modelValue="updateTaskStatus"
          >
            <UiSelectTrigger class="w-full text-[13px] bg-card">
              <UiSelectValue>
                <div class="flex items-center gap-3">
                  <div
                    class="w-3 h-3 rounded-full"
                    :style="{
                      backgroundColor: getColumnColor(currentStatus),
                    }"
                  ></div>
                  {{ currentStatus }}
                </div>
              </UiSelectValue>
            </UiSelectTrigger>
            <UiSelectContent class="bg-white">
              <UiSelectItem
                v-for="column in columns"
                :key="column.name"
                :value="column.name"
                class="text-[13px]"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-3 h-3 rounded-full"
                    :style="{ backgroundColor: column.label }"
                  ></div>
                  {{ column.name }}
                </div>
              </UiSelectItem>
            </UiSelectContent>
          </UiSelect>
        </div>
      </div>
    </UiDialogContent>

    <EditTask
      v-if="showEditTask"
      v-model="showEditTask"
      :task="task"
      :columns="columns"
      @task-updated="handleUpdateTask"
    />

    <DeleteTask
      v-if="showDeleteTask"
      v-model="showDeleteTask"
      :task="task"
      @task-deleted="handleDeleteTask"
    />
  </UiDialog>
</template>

<script setup lang="ts">
import EditTask from "./EditTask.vue";
import DeleteTask from "./DeleteTask.vue";
import { useBoardStore } from "../stores/boardStore";
import VerticalEllipsis from "./Icons/VerticalEllipsis.vue";
import type { Task } from "@/types/board";

const props = defineProps<{
  modelValue: boolean;
  task: Task;
  columns: Array<{ name: string; label: string }>;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const boardStore = useBoardStore();

const showEditTask = ref(false);
const showDeleteTask = ref(false);

const completedSubtasks = computed(() => {
  return props.task.subtasks.filter((subtask) => subtask.isCompleted).length;
});

const getColumnColor = (columnName: string) => {
  const column = props.columns.find((col) => col.name === columnName);
  return column?.label || "#000000";
};

const toggleSubtask = (index: number) => {
  const subtask = props.task.subtasks[index];
  boardStore.updateSubtask(props.task.id, index, !subtask.isCompleted);
};

const currentStatus = computed({
  get: () => props.task.status,
  set: (newStatus: string) => {
    if (newStatus !== props.task.status) {
      boardStore.updateTaskStatus(props.task.id, newStatus);
    }
  },
});

const updateTaskStatus = (newStatus: string) => {
  currentStatus.value = newStatus;
};

const handleEditClick = () => {
  emit("update:modelValue", false);
  showEditTask.value = true;
};

const handleDeleteClick = () => {
  emit("update:modelValue", false);
  showDeleteTask.value = true;
};

const handleUpdateTask = (updatedTask: Task) => {
  boardStore.updateTask(props.task.id, updatedTask);
  showEditTask.value = false;
  emit("update:modelValue", false);
};

const handleDeleteTask = () => {
  boardStore.deleteTask(props.task.id);
  showDeleteTask.value = false;
  emit("update:modelValue", false);
};
</script>
