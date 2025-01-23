<script setup lang="ts">
import { type Component, computed } from "vue";
import SidebarMenuButtonChild, {
  type SidebarMenuButtonProps,
} from "./SidebarMenuButtonChild.vue";
import { useSidebar } from "../../../composables/useSidebar";

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<
    SidebarMenuButtonProps & {
      tooltip?: string | Component;
    }
  >(),
  {
    as: "button",
    variant: "default",
    size: "default",
  }
);

const { isMobile, state } = useSidebar();

const delegatedProps = computed(() => {
  const { tooltip, ...delegated } = props;
  return delegated;
});
</script>

<template>
  <SidebarMenuButtonChild
    v-if="!tooltip"
    v-bind="{ ...delegatedProps, ...$attrs }"
  >
    <slot />
  </SidebarMenuButtonChild>

  <UiTooltip v-else>
    <UiTooltipTrigger as-child>
      <SidebarMenuButtonChild v-bind="{ ...delegatedProps, ...$attrs }">
        <slot />
      </SidebarMenuButtonChild>
    </UiTooltipTrigger>
    <UiTooltipContent
      side="right"
      align="center"
      :hidden="state !== 'collapsed' || isMobile"
    >
      <template v-if="typeof tooltip === 'string'">
        {{ tooltip }}
      </template>
      <component :is="tooltip" v-else />
    </UiTooltipContent>
  </UiTooltip>
</template>
