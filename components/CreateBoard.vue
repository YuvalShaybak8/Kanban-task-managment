<template>
  <UiDialog>
    <UiDialogTrigger
      class="dark:hover:bg-purple/10 w-11/12 flex items-center py-[13px] font-medium text-purple hover:bg-background rounded-r-full text-[16px]"
    >
      <span class="pl-4 lg:pl-8 flex items-center w-full">
        <BoardIcon class="mr-3 h-4 w-4" />
        + Create New Board
      </span>
    </UiDialogTrigger>
    <UiDialogContent class="sm:max-w-[480px] max-w-[95vw] mx-auto bg-card">
      <UiDialogHeader>
        <UiDialogTitle class="text-xl font-bold">Add new board</UiDialogTitle>
        <UiDialogClose
          class="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100"
        >
          <CrossIcon class="h-4 w-4" />
        </UiDialogClose>
      </UiDialogHeader>

      <form @submit.prevent="createBoard" class="space-y-6">
        <div class="space-y-2">
          <UiLabel class="font-bold text-[12px]">Name</UiLabel>
          <UiInput
            v-model="boardName"
            placeholder="e.g. Web Design"
            class="w-full text-[13px] dark:bg-card dark:border-gray-700"
          />
        </div>

        <div class="flex gap-4">
          <UiButton
            type="submit"
            class="flex-1 rounded-full text-[13px] text-white bg-purple hover:bg-purple/90"
          >
            Add
          </UiButton>
          <UiButton
            type="button"
            class="flex-1 rounded-full text-[13px] text-purple bg-gray/10 hover:bg-gray/20"
            @click="closeDialog"
          >
            Cancel
          </UiButton>
        </div>
      </form>
    </UiDialogContent>
  </UiDialog>
</template>

<script setup lang="ts">
import BoardIcon from "./Icons/BoardIcon.vue";
import type { Board } from "@/types/board";
import CrossIcon from "./Icons/CrossIcon.vue";
import { useBoardStore } from "#build/imports";

const boardName = ref("");
const boardStore = useBoardStore();

const emit = defineEmits<{
  (e: "board-created", board: Omit<Board, "isActive" | "columns" | "id">): void;
}>();

const closeDialog = () => {
  const dialogClose = document.querySelector('[data-state="open"]');
  if (dialogClose) {
    (dialogClose as HTMLElement).click();
  }
  boardName.value = "";
};

const createBoard = () => {
  if (!boardName.value.trim()) return;

  const newBoard = {
    name: boardName.value,
    id: Date.now(),
  };

  emit("board-created", newBoard);
  boardStore.setActiveBoard(newBoard.id);

  boardName.value = "";
  closeDialog();
};
</script>
