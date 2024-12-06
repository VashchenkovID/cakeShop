<template>
  <Dialog
    v-if="!isMobile"
    v-bind="{ ...props }"
    v-model:visible="model"
    modal
    close-on-escape
    :class="[className]"
  >
    <div class="MyModal">
      <div class="MyModal__header">
        <MyText view="ghost" size="x4l" weight="bold">{{ props.title }}</MyText>
        <i class="pi pi-times MyModal__header-close"></i>
      </div>
      <slot name="body" :closeModal="() => (model = false)"></slot>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { DialogProps } from "primevue";
import MyText from "./MyText.vue";

interface MyModalProps extends DialogProps {
  className?: string;
  title: string;
}

const props = defineProps<MyModalProps>();

const model = defineModel<boolean>();
</script>

<style scoped lang="scss">
@import "../../assets/global";

.MyModal {
  @include fluid(padding, 24px);
  display: flex;
  flex-direction: column;
  @include fluid(gap, 24px);
  background: $blockColor;
  @include fluid(border-radius, 16px);
  box-shadow: 1px 5px 5px 1px rgba(34, 134, 85, 0.14);
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    @include fluid(gap, 24px);
    &-close {
      @include fluid(width, 20px);
      @include fluid(height, 20px);
      @include fluid(font-size, 20px);
      cursor: pointer;
    }
  }
}
</style>
