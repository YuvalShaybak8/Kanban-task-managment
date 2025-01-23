<template>
  <UiDialog
    :open="modelValue"
    @update:open="$emit('update:modelValue', $event)"
  >
    <UiDialogContent class="sm:max-w-[480px] dark:bg-card">
      <UiDialogHeader>
        <UiDialogTitle class="text-xl font-bold">Edit Board</UiDialogTitle>
        <UiDialogClose
          class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
        >
          <CrossIcon class="h-4 w-4" />
        </UiDialogClose>
      </UiDialogHeader>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="space-y-2">
          <UiLabel class="font-bold text-[12px]">Name</UiLabel>
          <UiInput
            v-model="boardName"
            placeholder="e.g. Web Design"
            class="w-full text-[13px] dark:border-gray-700 dark:bg-card"
          />
        </div>

        <div class="flex gap-4">
          <UiButton
            type="submit"
            class="flex-1 rounded-full text-[13px] text-white bg-purple hover:bg-purple/90"
          >
            Save
          </UiButton>
          <UiButton
            type="button"
            class="flex-1 rounded-full text-[13px] text-purple bg-gray/10 hover:bg-gray/20"
            @click="$emit('update:modelValue', false)"
          >
            Cancel
          </UiButton>
        </div>
      </form>
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
  (e: "board-updated", name: string): void;
}>();

const boardName = ref(props.board.name);

const handleSubmit = () => {
  if (!boardName.value.trim()) return;
  emit("board-updated", boardName.value);
};
</script>
