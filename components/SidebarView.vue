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
              :class="[
                'w-11/12 flex items-center py-6 rounded-r-full font-medium text-[16px] transition-colors',
                board.isActive
                  ? 'bg-text_purple text-background dark:text-white'
                  : 'text-gray hover:bg-background dark:hover:bg-purple/10 hover:text-text_purple',
              ]"
            >
              <span class="pl-6 flex items-center w-full">
                <BoardIcon
                  class="mr-3 h-4 w-4 dark:hover:text-text_purple"
                  :class="{
                    'text-white': board.isActive,
                    'text-gray': !board.isActive,
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
            <div class="px-6 mb-4">
              <div
                class="bg-background rounded-md p-2.5 flex items-center justify-center gap-4"
              >
                <SunIcon class="h-5 w-5 text-gray" />
                <UiSwitch
                  @update:checked="
                    (value) => {
                      if (value) {
                        colorMode.preference = 'dark';
                      } else {
                        colorMode.preference = 'light';
                      }
                    }
                  "
                  class="data-[state]:bg-purple data-[state]:text-white"
                />
                <MoonIcon class="h-5 w-5 text-gray" />
              </div>
            </div>

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
import MoonIcon from "./Icons/MoonIcon.vue";
import SunIcon from "./Icons/SunIcon.vue";
import HideSidebar from "./Icons/HideSidebar.vue";
import ShowSidebar from "./Icons/ShowSidebar.vue";
import BoardIcon from "./Icons/BoardIcon.vue";
import Logo from "./Logo.vue";

const boardStore = useBoardStore();
const boards = computed(() => boardStore.boards);
const isCollapsed = computed(() => boardStore.isCollapsed);
const colorMode = useColorMode();

// const isDarkMode = computed(() => boardStore.isDarkMode);

const setActiveBoard = (boardId: number) => {
  boardStore.setActiveBoard(boardId);
};

// onMounted(() => {
//   const savedTheme = localStorage.getItem("theme");
//   if (savedTheme === "dark") {
//     boardStore.toggleDarkMode();
//     document.documentElement.classList.add("dark");
//   }
// });

// watch(isDarkMode, (newValue) => {
//   if (newValue) {
//     document.documentElement.classList.add("dark");
//     localStorage.setItem("theme", "dark");
//   } else {
//     document.documentElement.classList.remove("dark");
//     localStorage.setItem("theme", "light");
//   }
// });

const emit = defineEmits<{
  (e: "sidebarToggle", value: boolean): void;
}>();

const toggleSidebar = () => {
  boardStore.toggleSidebar();
  emit("sidebarToggle", boardStore.isCollapsed);
};

const addNewBoard = (newBoard: Omit<Board, "isActive" | "columns">) => {
  boardStore.addBoard(newBoard);

  boardStore.setActiveBoard(newBoard.id);
};
</script>
