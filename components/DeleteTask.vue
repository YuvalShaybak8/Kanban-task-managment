<template>
  <UiDialog
    :open="modelValue"
    @update:open="$emit('update:modelValue', $event)"
  >
    <UiDialogContent class="sm:max-w-[480px] bg-card dark:bg-background">
      <UiDialogHeader>
        <UiDialogTitle class="text-xl font-bold text-delete_button">
          Delete Task
        </UiDialogTitle>
      </UiDialogHeader>

      <div class="space-y-2">
        <p class="text-gray text-[13px] leading-6">
          Are you sure you want to delete this task?
        </p>
        <p class="text-gray text-[13px] leading-6">
          This action will delete all the sub tasks in this task and cannot be
          reversed.
        </p>
      </div>

      <div class="flex items-center justify-end gap-4 mt-6">
        <UiButton
          type="button"
          class="flex-1 rounded-full bg-delete_button hover:bg-delete_button/90 text-white text-[13px]"
          @click="deleteTask"
        >
          Delete
        </UiButton>
        <UiButton
          type="button"
          class="flex-1 rounded-full bg-background hover:bg-background/50 text-button_modal text-[13px]"
          @click="$emit('update:modelValue', false)"
        >
          Cancel
        </UiButton>
      </div>
    </UiDialogContent>
  </UiDialog>
</template>

<script setup lang="ts">
import type { Task } from "@/types/board";

const props = defineProps<{
  modelValue: boolean;
  task: Task;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "task-deleted"): void;
}>();

const deleteTask = () => {
  emit("task-deleted");
};
</script>
