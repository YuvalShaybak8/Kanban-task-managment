<script setup lang="ts">
import { cn } from "@/lib/utils";
import type { ClassValue } from "clsx";

const props = defineProps<{
  class?: ClassValue;
  tag?: keyof HTMLElementTagNameMap;
  onClick: (e?: MouseEvent) => void;
}>();

const delegatedProps = computed(() => {
  const { tag, class: _, ...delegated } = props;
  return delegated;
});

const tag = computed((): keyof HTMLElementTagNameMap => {
  if (props.tag) return props.tag;
  else if (props?.onClick) return "button";
  return "div";
});
</script>

<template>
  <component
    :is="tag"
    v-bind="delegatedProps"
    :class="
      cn(
        'rounded-lg border bg-card text-card-foreground shadow-sm',
        props.class
      )
    "
  >
    <slot />
  </component>
</template>
