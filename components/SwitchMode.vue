<template>
  <div class="px-6 mb-4">
    <div
      class="bg-background rounded-md p-2.5 flex items-center justify-center gap-4"
    >
      <SunIcon class="h-5 w-5 text-gray" />
      <UiSwitch
        :checked="isDarkMode"
        @update:checked="handleModeChange"
        class="data-[state]:bg-purple data-[state]:text-white"
      />
      <MoonIcon class="h-5 w-5 text-gray" />
    </div>
  </div>
</template>

<script setup lang="ts">
import MoonIcon from "./Icons/MoonIcon.vue";
import SunIcon from "./Icons/SunIcon.vue";

const colorMode = useColorMode();

const systemDarkMode = ref(false);
const isDarkMode = computed(() => colorMode.value === "dark");

onMounted(() => {
  if (window.matchMedia) {
    systemDarkMode.value = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    colorMode.preference = systemDarkMode.value ? "dark" : "light";

    // Listen for system color scheme changes
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        systemDarkMode.value = e.matches;
        colorMode.preference = e.matches ? "dark" : "light";
      });
  }
});

const handleModeChange = (value: boolean) => {
  colorMode.preference = value ? "dark" : "light";
};
</script>
