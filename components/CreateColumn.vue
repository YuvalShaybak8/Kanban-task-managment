<template>
  <UiDialog>
    <UiDialogTrigger asChild>
      <div class="min-w-[280px] w-[280px] flex flex-col">
        <h3
          class="uppercase text-gray font-medium text-[11px] tracking-[2.4px] mb-10 opacity-0"
        ></h3>
        <UiButton
          variant="ghost"
          class="hover:bg-column_gray dark:bg-newcolumn hover:text-gray w-full h-[calc(100%-40px)] bg-column_gray hover:opacity-80 rounded-lg flex items-center justify-center text-gray font-bold text-[24px]"
        >
          + New Column
        </UiButton>
      </div>
    </UiDialogTrigger>

    <UiDialogContent class="sm:max-w-[425px]">
      <UiDialogHeader>
        <UiDialogTitle class="text-lg font-bold">Add New Column</UiDialogTitle>
      </UiDialogHeader>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="space-y-2">
          <UiLabel for="name">Name</UiLabel>
          <UiInput
            id="name"
            v-model="columnData.name"
            placeholder="e.g. Todo"
            class="w-full"
          />
        </div>

        <div class="space-y-2">
          <UiLabel>Label</UiLabel>
          <UiSelect v-model="columnData.color">
            <UiSelectTrigger class="w-full">
              <UiSelectValue placeholder="Select a Label" />
            </UiSelectTrigger>
            <UiSelectContent class="bg-white">
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

        <UiDialogFooter>
          <UiButton
            type="submit"
            class="w-full rounded-full bg-purple text-white hover:bg-purple/90"
          >
            Add
          </UiButton>
        </UiDialogFooter>
      </form>
    </UiDialogContent>
  </UiDialog>
</template>

<script setup lang="ts">
import { columnColors } from "@/types/colors";

const emit = defineEmits(["column-created"]);

const columnData = ref({
  name: "",
  color: "",
});

const handleSubmit = () => {
  if (!columnData.value.name.trim() || !columnData.value.color) return;

  const newColumn = {
    name: columnData.value.name,
    color: columnData.value.color,
    tasks: [],
  };

  emit("column-created", newColumn);

  columnData.value = {
    name: "",
    color: "",
  };

  const dialogTrigger = document.querySelector('[data-state="open"]');
  if (dialogTrigger) {
    (dialogTrigger as HTMLElement).click();
  }
};
</script>
