<template>
  <UiDialog
    :open="modelValue"
    @update:open="$emit('update:modelValue', $event)"
  >
    <UiDialogContent class="sm:max-w-[480px] bg-card">
      <UiDialogHeader>
        <UiDialogTitle class="text-xl font-bold text-delete_button">
          Delete this column?
        </UiDialogTitle>
      </UiDialogHeader>

      <div class="space-y-2">
        <p class="text-gray text-[13px] leading-6">
          Are you sure you want to delete the column "{{ column.name }}"?
        </p>
        <p class="text-gray text-[13px] leading-6">
          This action will delete all the tasks and sub tasks in this column and
          can not be reversed.
        </p>
      </div>

      <div class="flex items-center justify-center gap-4 mt-6">
        <UiButton
          type="button"
          class="rounded-full bg-delete_button hover:bg-delete_button/90 text-white text-[13px] w-[calc(50%-10px)] px-6"
          @click="deleteColumn"
        >
          Delete
        </UiButton>
        <UiButton
          type="button"
          class="rounded-full bg-background hover:bg-background/50 text-button_modal text-[13px] w-[calc(50%-10px)] px-6"
          @click="$emit('update:modelValue', false)"
        >
          Cancel
        </UiButton>
      </div>
    </UiDialogContent>
  </UiDialog>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
  column: {
    name: string;
    label: string;
  };
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "column-deleted"): void;
}>();

const deleteColumn = () => {
  emit("column-deleted");
};
</script>
