<template>
  <UiDialog>
    <UiDialogTrigger
      class="bg-button_modal hover:bg-button_modal/90 text-button_text rounded-full px-4 py-2.5 flex items-center gap-2 font-bold text-[17px]"
    >
      <!-- Mobile View -->
      <span
        class="flex w-5 h-1 items-center justify-center text-[22px] font-medium leading-none mb-2 lg:hidden"
      >
        +
      </span>

      <!-- Desktop View -->
      <span class="font-medium text-[17px] hidden lg:inline"> + </span>
      <span class="hidden lg:inline"> Add New Task </span>
    </UiDialogTrigger>
    <UiDialogContent
      class="sm:max-w-[480px] max-w-[95vw] mx-auto rounded bg-card"
    >
      <UiDialogHeader>
        <UiDialogTitle class="text-xl font-bold">Add New Task</UiDialogTitle>
        <UiDialogClose
          class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
        >
          <CrossIcon class="h-4 w-4" />
        </UiDialogClose>
      </UiDialogHeader>

      <form @submit.prevent="createTask" class="space-y-6">
        <div class="space-y-2">
          <UiLabel class="text-[12px] font-bold text-black dark:text-white"
            >Task Name</UiLabel
          >
          <UiInput
            v-model="taskData.title"
            placeholder="Take title"
            class="w-full text-[16px] bg-card dark:border-gray-700"
            type="text"
            required
          />
        </div>

        <div class="space-y-2">
          <UiLabel class="text-[12px] font-bold text-black dark:text-white"
            >Description</UiLabel
          >
          <UiTextarea
            v-model="taskData.description"
            placeholder="Take Description"
            class="min-h-[112px] w-full resize-none text-[13px] bg-card dark:border-gray-700"
          />
        </div>

        <div class="space-y-3">
          <UiLabel class="text-[12px] font-bold text-black dark:text-white"
            >Subtasks</UiLabel
          >
          <div
            v-if="taskData.subtasks.length === 0"
            class="text-[13px] text-gray text-center py-2"
          >
            No subtasks added
          </div>
          <div v-else class="space-y-3">
            <div
              v-for="(subtask, index) in taskData.subtasks"
              :key="index"
              class="flex items-center gap-4"
            >
              <UiInput
                v-model="subtask.title"
                class="flex-1 text-[16px] bg-card dark:border-gray-700"
                placeholder="Subtask Title"
                type="text"
                required
              />
              <button
                type="button"
                class="text-gray hover:text-gray/80"
                @click="removeSubtask(index)"
              >
                <CrossIcon class="h-4 w-4" />
              </button>
            </div>
          </div>
          <UiButton
            type="button"
            class="w-full rounded-full bg-button_modal/10 hover:bg-button_modal/20 text-purple text-[13px]"
            @click="addSubtask"
          >
            + Add New Subtask
          </UiButton>
        </div>

        <div class="space-y-2">
          <UiLabel class="text-[12px] font-bold text-black dark:text-white"
            >Status</UiLabel
          >
          <UiSelect v-model="taskData.status">
            <UiSelectTrigger
              class="w-full text-[13px] bg-card dark:border-gray-700"
            >
              <UiSelectValue :placeholder="placeholderText">
                <div v-if="taskData.status" class="flex items-center gap-3">
                  <div
                    class="w-3 h-3 rounded-full"
                    :style="{
                      backgroundColor: currentBoard?.columns.find(
                        (col) => col.name === taskData.status
                      )?.label,
                    }"
                  ></div>
                  {{ taskData.status }}
                </div>
                <span v-else>{{ placeholderText }}</span>
              </UiSelectValue>
            </UiSelectTrigger>
            <UiSelectContent class="bg-white">
              <UiSelectItem
                v-for="column in currentBoard?.columns"
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

        <UiButton
          type="submit"
          class="w-full rounded-full bg-purple hover:bg-purple/90 text-white text-[13px]"
        >
          Add
        </UiButton>
      </form>
    </UiDialogContent>
  </UiDialog>
</template>

<script setup lang="ts">
import { useBoardStore } from "../stores/boardStore";
import type { Task } from "@/types/board";
import CrossIcon from "./Icons/CrossIcon.vue";

const boardStore = useBoardStore();
const activeBoardId = computed(() => boardStore.activeBoardId);

const currentBoard = computed(() =>
  boardStore.boards.find((board) => board.id === activeBoardId.value)
);

const taskData = ref({
  title: "",
  description: "",
  subtasks: [] as { title: string; isCompleted: boolean }[],
  status: "",
});

const placeholderText = "Select a Status";

const addSubtask = () => {
  taskData.value.subtasks.push({
    title: "",
    isCompleted: false,
  });
};

const removeSubtask = (index: number) => {
  taskData.value.subtasks.splice(index, 1);
};

const createTask = () => {
  if (!taskData.value.title.trim() || !activeBoardId.value) return;

  const newTask: Omit<Task, "id"> = {
    title: taskData.value.title,
    description: taskData.value.description,
    subtasks: taskData.value.subtasks.filter((subtask) => subtask.title.trim()),
    status: taskData.value.status,
  };

  boardStore.addTask(activeBoardId.value, taskData.value.status, newTask);

  taskData.value = {
    title: "",
    description: "",
    subtasks: [],
    status: currentBoard.value?.columns[0]?.name || "",
  };

  const dialogClose = document.querySelector('[data-state="open"]');
  if (dialogClose) {
    (dialogClose as HTMLElement).click();
  }
};
</script>
