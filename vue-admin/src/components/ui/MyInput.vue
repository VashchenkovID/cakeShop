<template>
  <FloatLabel variant="on">
    <InputText v-model="model" v-bind="props" class="MyInput" />
    <label for="on_label"
      ><MyText rool-el="span" size="s" view="primary"
        >{{ props.label }}
      </MyText></label
    >
  </FloatLabel>
</template>

<script setup lang="ts">
import { ITextFieldProps } from "./interfaces.ts";
import MyText from "./MyText.vue";

const props = defineProps<ITextFieldProps>();
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
  @include fluidImportant(font-size, 14px);
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
