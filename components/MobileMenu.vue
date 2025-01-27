<template>
  <nav class="lg:hidden bg-card w-full shadow-md h-[80px]">
    <div class="h-full flex items-center justify-between px-4">
      <div class="flex items-center">
        <LogoMobile class="h-[25px] w-[25px]" />
        <div class="h-[80px] w-px bg-gray-200 dark:bg-border mx-4" />
        <UiDropdownMenu>
          <UiDropdownMenuTrigger class="flex items-center gap-2 h-[80px] group">
            <h1 class="text-xl font-bold">{{ activeBoard.name }}</h1>
            <div class="flex items-center">
              <ChevronUp
                class="text-purple transform origin-center transition-transform duration-200 group-data-[state=open]:rotate-180"
              />
            </div>
          </UiDropdownMenuTrigger>
          <UiDropdownMenuContent class="bg-card w-[280px] translate-x-9">
            <h3 class="text-[14px] font-semibold text-gray tracking-widest p-4">
              ALL BOARDS ({{ boards.length }})
            </h3>
            <div class="space-y-1 mb-2">
              <UiDropdownMenuItem
                v-for="board in boards"
                :key="board.id"
                @click="setActiveBoard(board.id)"
                :class="[
                  'w-11/12 flex items-center py-3 rounded-r-full font-medium text-[16px] transition-colors cursor-pointer',
                  board.isActive
                    ? 'bg-purple text-white'
                    : 'text-gray hover:bg-background dark:hover:bg-purple/10 hover:text-purple',
                ]"
              >
                <span class="pl-2 flex items-center w-full">
                  <BoardIcon
                    class="mr-3 h-4 w-4"
                    :class="{
                      'text-white': board.isActive,
                      'text-gray': !board.isActive,
                    }"
                  />
                  {{ board.name }}
                </span>
              </UiDropdownMenuItem>
              <CreateBoard @board-created="addNewBoard" />
            </div>
            <SwitchMode />
          </UiDropdownMenuContent>
        </UiDropdownMenu>
      </div>

      <div class="flex items-center gap-4">
        <CreateTask />
        <UiDropdownMenu>
          <UiDropdownMenuTrigger>
            <VerticalEllipsis class="text-gray" />
          </UiDropdownMenuTrigger>
          <UiDropdownMenuContent
            class="bg-card w-[150px] -translate-x-4 translate-y-2"
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

    <EditBoard
      v-if="showEditBoard"
      v-model="showEditBoard"
      :board="activeBoard"
      @board-updated="updateBoard"
    />

    <DeleteBoard
      v-if="showDeleteBoard"
      v-model="showDeleteBoard"
      :board="activeBoard"
      @board-deleted="deleteBoard"
    />
  </nav>
</template>

<script setup lang="ts">
import ChevronUp from "./Icons/ChevronUp.vue";
import VerticalEllipsis from "./Icons/VerticalEllipsis.vue";
import { useBoardStore } from "../stores/boardStore";
import SwitchMode from "./SwitchMode.vue";
import type { Board } from "@/types/board";
import BoardIcon from "./Icons/BoardIcon.vue";
import LogoMobile from "./Icons/LogoMobile.vue";
import EditBoard from "./EditBoard.vue";
import DeleteBoard from "./DeleteBoard.vue";
import CreateBoard from "./CreateBoard.vue";
import CreateTask from "./CreateTask.vue";

const boardStore = useBoardStore();
const activeBoard = computed(() => boardStore.activeBoard);
const boards = computed(() => boardStore.boards);

const showEditBoard = ref(false);
const showDeleteBoard = ref(false);
const emit = defineEmits(["create-task"]);

const setActiveBoard = (boardId: number) => {
  boardStore.setActiveBoard(boardId);
};

const updateBoard = (boardName: string) => {
  boardStore.updateBoardName(activeBoard.value.id, boardName);
  showEditBoard.value = false;
};

const deleteBoard = () => {
  boardStore.deleteBoard(activeBoard.value.id);
  showDeleteBoard.value = false;
};

const addNewBoard = (newBoard: Omit<Board, "isActive" | "columns">) => {
  boardStore.addBoard(newBoard);
  boardStore.setActiveBoard(newBoard.id);
};
</script>
