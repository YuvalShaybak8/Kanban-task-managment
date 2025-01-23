<template>
  <UiDialog
    :open="modelValue"
    @update:open="$emit('update:modelValue', $event)"
  >
    <UiDialogContent class="sm:max-w-[480px] bg-card">
      <UiDialogHeader>
        <UiDialogTitle class="text-xl font-bold">Edit Task</UiDialogTitle>
      </UiDialogHeader>

      <form @submit.prevent="updateTask" class="space-y-6">
        <div class="space-y-2">
          <UiLabel class="text-[12px] font-bold text-black">Title</UiLabel>
          <UiInput
            v-model="taskData.title"
            placeholder="Task title"
            class="w-full text-[13px] bg-card"
          />
        </div>

        <div class="space-y-2">
          <UiLabel class="text-[12px] font-bold text-black"
            >Description</UiLabel
          >
          <UiTextarea
            v-model="taskData.description"
            placeholder="Task Description"
            class="min-h-[112px] w-full resize-none text-[13px] bg-card"
          />
        </div>

        <div class="space-y-3">
          <UiLabel class="text-[12px] font-bold text-black">Subtasks</UiLabel>
          <div class="space-y-3">
            <div
              v-for="(subtask, index) in taskData.subtasks"
              :key="index"
              class="flex items-center gap-4"
            >
              <UiInput
                v-model="subtask.title"
                class="flex-1 text-[13px] bg-card"
                placeholder="Subtask Title"
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
            @click="addNewSubtask"
          >
            + Add New Subtask
          </UiButton>
        </div>

        <div class="space-y-2">
          <UiLabel class="text-[12px] font-bold text-black">Status</UiLabel>
          <UiSelect v-model="taskData.status">
            <UiSelectTrigger class="w-full text-[13px] bg-card">
              <UiSelectValue>
                <div class="flex items-center gap-3">
                  <div
                    class="w-3 h-3 rounded-full"
                    :style="{
                      backgroundColor: getColumnColor(taskData.status),
                    }"
                  ></div>
                  {{ taskData.status }}
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

        <UiButton
          type="submit"
          class="w-full font-semibold rounded-full bg-purple hover:bg-purple/90 text-white text-[13px]"
        >
          Save
        </UiButton>
      </form>
    </UiDialogContent>
  </UiDialog>
</template>

<script setup lang="ts">
import type { Task } from "@/types/board";
import CrossIcon from "./Icons/CrossIcon.vue";

const props = defineProps<{
  modelValue: boolean;
  task: Task;
  columns: Array<{ name: string; label: string }>;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "task-updated", task: Task): void;
}>();

const taskData = ref({
  ...props.task,
  subtasks: [...props.task.subtasks.map((subtask) => ({ ...subtask }))],
});

const getColumnColor = (columnName: string) => {
  const column = props.columns.find((col) => col.name === columnName);
  return column?.label || "#000000";
};

const addNewSubtask = () => {
  taskData.value.subtasks.push({
    title: "",
    isCompleted: false,
  });
};

const removeSubtask = (index: number) => {
  taskData.value.subtasks.splice(index, 1);
};

const updateTask = () => {
  if (!taskData.value.title.trim()) return;

  const updatedTask = {
    ...taskData.value,
    subtasks: taskData.value.subtasks.filter((subtask) => subtask.title.trim()),
  };

  emit("task-updated", updatedTask);
};
</script>
