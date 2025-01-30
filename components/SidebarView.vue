<template>
  <UiSidebarProvider>
    <UiSidebar
      :class="[isCollapsed ? '-translate-x-[64px]' : 'translate-x-0']"
      class="bg-card"
    >
      <UiSidebarHeader>
        <Logo v-show="!isCollapsed" class="h-[80px]" />
        <h2
          class="text-[14px] font-semibold text-gray tracking-widest mb-4 pl-6"
        >
          ALL BOARDS ({{ boards.length }})
        </h2>
      </UiSidebarHeader>

      <UiSidebarContent class="flex justify-between">
        <UiSidebarMenu class="gap-0">
          <UiSidebarMenuItem v-for="board in boards" :key="board.id">
            <UiSidebarMenuButton
              @click="setActiveBoard(board.id)"
              :class="
                cn(
                  'w-11/12 flex items-center py-6 rounded-r-full font-medium text-[16px] transition-colors',
                  {
                    'bg-green-500 text-background dark:text-white':
                      board.id === activeBoardId,
                    'text-gray hover:bg-background dark:hover:bg-purple/10 hover:text-text_purple':
                      board.id !== activeBoardId,
                  }
                )
              "
            >
              <span class="pl-6 flex items-center w-full">
                <BoardIcon
                  class="mr-3 h-4 w-4 dark:hover:text-text_purple"
                  :class="{
                    'text-white': board.id === activeBoardId,
                    'text-gray': board.id !== activeBoardId,
                  }"
                />
                {{ board.name }}
              </span>
            </UiSidebarMenuButton>
          </UiSidebarMenuItem>

          <UiSidebarMenuItem>
            <CreateBoard @board-created="addNewBoard" />
          </UiSidebarMenuItem>
        </UiSidebarMenu>

        <UiSidebarMenu>
          <div class="pb-8">
            <SwitchMode />

            <div
              class="mr-6 hover:bg-background group rounded-r-full transition-colors duration-200"
            >
              <UiSidebarTrigger
                @click="toggleSidebar"
                class="w-full flex items-center py-6 pl-8 text-s font-bol bg-card rounded-r-full dark:hover:bg-purple/20"
              >
                <template #icon>
                  <HideSidebar
                    class="h-4 w-4 text-gray group-hover:text-purple transition-colors duration-200"
                  />
                  <span
                    class="flex items-center w-full text-[15px] text-gray group-hover:text-purple transition-colors duration-200"
                  >
                    Hide Sidebar
                  </span>
                </template>
              </UiSidebarTrigger>
            </div>
          </div>
        </UiSidebarMenu>
      </UiSidebarContent>
      <UiSidebarRail />
    </UiSidebar>

    <UiSidebarTrigger
      v-show="isCollapsed"
      @click="toggleSidebar"
      class="fixed -left-2 bottom-8 bg-purple hover:bg-purple/90 text-white py-3 w-[64px] rounded-r-3xl h-[45px] flex items-center justify-center z-30 transition-all duration-200 ease-in-out opacity-0"
      :class="[
        isCollapsed
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 -translate-x-full',
      ]"
    >
      <template #icon>
        <ShowSidebar class="text-white my-auto" />
      </template>
    </UiSidebarTrigger>

    <slot />
  </UiSidebarProvider>
</template>

<script setup lang="ts">
import { useBoardStore } from "../stores/boardStore";
import type { Board } from "@/types/board";
import SwitchMode from "./SwitchMode.vue";
import HideSidebar from "./Icons/HideSidebar.vue";
import ShowSidebar from "./Icons/ShowSidebar.vue";
import BoardIcon from "./Icons/BoardIcon.vue";
import Logo from "./Logo.vue";
import { cn } from "@/lib/utils";

const boardStore = useBoardStore();
const boards = computed(() => boardStore.boards);
const activeBoardId = computed(() => boardStore.activeBoardId);
const isCollapsed = computed(() => boardStore.isCollapsed);

const setActiveBoard = (boardId: number) => {
  boardStore.setActiveBoard(boardId);
};

const emit = defineEmits<{
  (e: "sidebarToggle", value: boolean): void;
}>();

const toggleSidebar = () => {
  boardStore.toggleSidebar();
  emit("sidebarToggle", boardStore.isCollapsed);
};

const addNewBoard = (newBoard: Omit<Board, "columns">) => {
  boardStore.addBoard(newBoard);
  if (newBoard.id) {
    boardStore.setActiveBoard(newBoard.id);
  }
};
</script>
