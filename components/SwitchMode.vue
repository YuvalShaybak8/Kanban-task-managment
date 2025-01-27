<template>
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
</template>

<script setup lang="ts">
import MoonIcon from "./Icons/MoonIcon.vue";
import SunIcon from "./Icons/SunIcon.vue";

const colorMode = useColorMode();
</script>
