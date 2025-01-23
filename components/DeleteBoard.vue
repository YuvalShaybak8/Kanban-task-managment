<template>
  <UiDialog
    :open="modelValue"
    @update:open="$emit('update:modelValue', $event)"
  >
    <UiDialogContent class="sm:max-w-[480px]">
      <UiDialogHeader>
        <UiDialogTitle class="text-xl font-bold text-delete_button"
          >Delete Board</UiDialogTitle
        >
        <UiDialogClose
          class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
        >
          <CrossIcon class="h-4 w-4" />
        </UiDialogClose>
      </UiDialogHeader>

      <div class="py-6">
        <p class="text-gray text-[13px]">
          Are you sure you want to delete the board {{ board.name }}?
        </p>
        <p class="text-gray text-[13px] mt-6">
          This action will delete all the columns, tasks and sub tasks in this
          board and cannot be reversed.
        </p>
      </div>

      <div class="flex gap-4">
        <UiButton
          type="button"
          class="flex-1 rounded-full text-[13px] text-white bg-delete_button hover:bg-delete_button/90"
          @click="handleDelete"
        >
          Delete
        </UiButton>
        <UiButton
          type="button"
          class="flex-1 rounded-full text-[13px] bg-gray/10 hover:bg-gray/20 text-purple"
          @click="$emit('update:modelValue', false)"
        >
          Cancel
        </UiButton>
      </div>
    </UiDialogContent>
  </UiDialog>
</template>

<script setup lang="ts">
import type { Board } from "@/types/board";
import CrossIcon from "./Icons/CrossIcon.vue";

interface Props {
  modelValue: boolean;
  board: Board;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "board-deleted"): void;
}>();

const handleDelete = () => {
  emit("board-deleted");
};
</script>
