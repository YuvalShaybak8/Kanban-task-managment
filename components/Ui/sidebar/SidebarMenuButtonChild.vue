<script setup lang="ts">
import { cn } from "@/lib/utils";
import { Primitive } from "radix-vue";
import {
  sidebarMenuButtonVariants,
  type SidebarMenuButtonProps,
} from "@/types/sidebar";

const props = withDefaults(defineProps<SidebarMenuButtonProps>(), {
  as: "button",
  variant: "default",
  size: "default",
});
</script>

<template>
  <Primitive
    data-sidebar="menu-button"
    :data-size="size"
    :data-active="isActive"
    :class="cn(sidebarMenuButtonVariants({ variant, size }), props.class)"
    :as="as"
    :as-child="asChild"
    v-bind="$attrs"
  >
    <slot />
  </Primitive>
</template>
