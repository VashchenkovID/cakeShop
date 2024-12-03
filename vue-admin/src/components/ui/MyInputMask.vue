<template>
  <FloatLabel variant="on">
    <InputMask
      id="on_label_mask"
      v-bind="props"
      :mask="props.mask"
      class="MyInput"
      v-model="model"
    />
    <label v-if="props.label" for="on_label_mask"
      ><MyText rool-el="span" size="s" view="primary"
        >{{ props.label }}
      </MyText></label
    >
  </FloatLabel>
</template>

<script setup lang="ts">
import MyText from "./MyText.vue";
import { InputMaskProps } from "primevue";
interface IInputMaskProps extends InputMaskProps {
  label?: string;
}
const props = defineProps<IInputMaskProps>();
const model = defineModel<string | undefined>();
</script>

<style lang="scss">
@import "../../assets/global";
$labelColor: $blockColor;

.MyInput {
  @include fluidImportant(border-radius, 16px);
  @include fluidImportant(min-height, 40px);
  background: transparent !important;
  border-color: $primaryColor !important;
  color: $whiteColor !important;
  width: 100% !important;
}
.p-inputtext {
  width: 100% !important;
}
.p-floatlabel {
  background: transparent;
}
label {
  font-weight: 500 !important;
  @include fluidImportant(font-size, 14px);
  --p-floatlabel-on-active-background: #262d48;
}
</style>
