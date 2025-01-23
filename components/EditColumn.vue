<template>
  <UiDialog
    :open="modelValue"
    @update:open="$emit('update:modelValue', $event)"
  >
    <UiDialogContent class="sm:max-w-[480px] bg-card">
      <UiDialogHeader>
        <UiDialogTitle class="text-xl font-bold">Edit Column</UiDialogTitle>
        <UiDialogClose
          class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
        >
          <CrossIcon class="h-4 w-4" />
        </UiDialogClose>
      </UiDialogHeader>

      <form @submit.prevent="updateColumn" class="space-y-6">
        <div class="space-y-2">
          <UiLabel class="text-[12px] font-bold text-black dark:text-white"
            >Name</UiLabel
          >
          <UiInput
            v-model="columnData.name"
            placeholder="Column Name"
            class="w-full text-[13px] bg-card dark:border-gray-700"
          />
        </div>

        <div class="space-y-2">
          <UiLabel class="text-[12px] font-bold text-black dark:text-white"
            >Color</UiLabel
          >
          <UiSelect v-model="columnData.label">
            <UiSelectTrigger
              class="w-full text-[13px] bg-card dark:border-gray-700"
            >
              <UiSelectValue>
                <div class="flex items-center gap-3">
                  <div
                    class="w-3 h-3 rounded-full"
                    :style="{ backgroundColor: columnData.label }"
                  ></div>
                  Color
                </div>
              </UiSelectValue>
            </UiSelectTrigger>
            <UiSelectContent class="bg-white dark:bg-background">
              <div class="max-h-[300px] overflow-y-auto">
                <UiSelectItem
                  v-for="color in columnColors"
                  :key="color.hex"
                  :value="color.hex"
                  class="flex items-center py-2 cursor-pointer"
                >
                  <div class="flex items-center gap-3">
                    <div
                      class="w-3 h-3 rounded-full"
                      :style="{ backgroundColor: color.hex }"
                    ></div>
                    <span>{{ color.name }}</span>
                  </div>
                </UiSelectItem>
              </div>
            </UiSelectContent>
          </UiSelect>
        </div>

        <UiButton
          type="submit"
          class="w-full rounded-full bg-purple hover:bg-purple/90 text-white text-[13px]"
        >
          Save Changes
        </UiButton>
      </form>
    </UiDialogContent>
  </UiDialog>
</template>

<script setup lang="ts">
import CrossIcon from "./Icons/CrossIcon.vue";
import { columnColors } from "@/types/colors";

const props = defineProps<{
  modelValue: boolean;
  column: {
    name: string;
    label: string;
  };
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "column-updated", value: { name: string; label: string }): void;
}>();

const columnData = ref({
  name: props.column.name,
  label: props.column.label,
});

const updateColumn = () => {
  if (!columnData.value.name.trim()) return;

  emit("column-updated", {
    name: columnData.value.name,
    label: columnData.value.label,
  });

  emit("update:modelValue", false);
};

watch(
  () => props.modelValue,
  (newValue) => {
    if (!newValue) {
      columnData.value = {
        name: props.column.name,
        label: props.column.label,
      };
    }
  }
);
</script>
