<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { PanelLeft } from "lucide-vue-next";
import { useSidebar } from "../../../composables/useSidebar";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();

const { toggleSidebar } = useSidebar();
</script>

<template>
  <UiButton
    data-sidebar="trigger"
    variant="ghost"
    size="icon"
    :class="cn('h-7 w-7', props.class)"
    @click="toggleSidebar"
  >
    <slot name="icon">
      <PanelLeft />
      <!-- Default icon -->
    </slot>
    <span class="sr-only">Toggle Sidebar</span>
  </UiButton>
</template>
