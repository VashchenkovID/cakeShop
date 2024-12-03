<template>
  <Button v-bind="props" :class="['MyButton', props?.view || 'primary', size]">
    <template #default>
      <slot>{{ props.label }}</slot>
    </template>
  </Button>
</template>

<script setup lang="ts">
import { MyButtonProps } from "./interfaces.ts";

const props = defineProps<MyButtonProps>();
</script>

<style scoped lang="scss">
@import "../../assets/global";

.MyButton {
  @include fluid(padding, 8px);
  display: flex;
  justify-content: center;
  align-items: center;
  @include fluid(font-size, 14px, 16px);
  @include fluid(line-height, 18px, 20px);
  @include fluid(border-radius, 16px);
  --p-button-primary-focus-ring-color: tranparent;
  --p-button-primary-focus-ring-shadow: none;
}
.large {
  @include fluid(padding, 10px);
}
.primary {
  background: $primaryColor;
  color: $whiteColor;
  border: 1px solid $primaryColor;
  &:hover {
    color: $whiteColor;
    background: $primaryHoverColor !important;
    border-color: $primaryHoverColor !important;
  }
  &:active {
    color: $whiteColor;
    background: $primaryFocusColor !important;
    border-color: $primaryFocusColor !important;
  }
}
.secondary {
  background: transparent;
  color: $primaryColor;

  border: 1px solid $primaryColor;
  &:hover {
    color: $primaryHoverColor !important;
    border-color: $primaryHoverColor !important;
    background: transparent !important;
  }
  &:active {
    color: $whiteColor !important;
    background: $primaryFocusColor !important;
    border-color: $primaryFocusColor !important;
  }
}
button {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
}
</style>
