<template>
  <nav class="bg-card w-full shadow-md h-[80px]">
    <div class="h-full flex items-center">
      <Logo v-show="isCollapsed" />

      <div class="h-[80px] w-px bg-gray-200 dark:bg-border"></div>

      <div class="flex-1 flex items-center justify-between px-6">
        <div class="board-title">
          <h1 class="text-xl font-bold">{{ currentBoard?.name }}</h1>
        </div>

        <div class="flex items-center gap-4">
          <CreateTask />
          <UiDropdownMenu>
            <UiDropdownMenuTrigger class="p-2 rounded-full">
              <VerticalEllipsis class="text-gray" />
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent
              class="bg-card w-[100px] -translate-x-[30px] translate-y-2"
            >
              <UiDropdownMenuItem
                @click="showEditBoard = true"
                class="text-gray text-[13px] py-4 cursor-pointer"
              >
                Edit board
              </UiDropdownMenuItem>
              <UiDropdownMenuItem
                @click="showDeleteBoard = true"
                class="text-delete_button text-[13px] py-4 cursor-pointer"
              >
                Delete board
              </UiDropdownMenuItem>
            </UiDropdownMenuContent>
          </UiDropdownMenu>
        </div>
      </div>
    </div>

    <EditBoard
      v-if="showEditBoard"
      v-model="showEditBoard"
      :board="currentBoard"
      @board-updated="updateBoard"
    />

    <DeleteBoard
      v-if="showDeleteBoard"
      v-model="showDeleteBoard"
      :board="currentBoard"
      @board-deleted="deleteBoard"
    />
  </nav>
</template>

<script setup lang="ts">
import { useBoardStore } from "../stores/boardStore";
import VerticalEllipsis from "./Icons/VerticalEllipsis.vue";
import CreateTask from "./CreateTask.vue";
import EditBoard from "./EditBoard.vue";
import DeleteBoard from "./DeleteBoard.vue";

const boardStore = useBoardStore();
const activeBoardId = computed(() => boardStore.activeBoardId);

const currentBoard = computed(() =>
  boardStore.boards.find((board) => board.id === activeBoardId.value)
);

const isCollapsed = computed(() => boardStore.isCollapsed);

const showEditBoard = ref(false);
const showDeleteBoard = ref(false);

const updateBoard = (boardName: string) => {
  if (activeBoardId.value) {
    boardStore.updateBoardName(activeBoardId.value, boardName);
    showEditBoard.value = false;
  }
};

const deleteBoard = () => {
  if (activeBoardId.value) {
    boardStore.deleteBoard(activeBoardId.value);
    showDeleteBoard.value = false;
  }
};
</script>
