<template>
  <FloatLabel variant="on">
    <InputText v-bind="props"/>
    <label for="on_label">{{ props.label}}</label>
  </FloatLabel>
</template>

<script setup lang="ts">


import {ITextFieldProps} from "./interfaces.ts";

const props = defineProps<ITextFieldProps>()

</script>

<style lang="scss">
@import "../../assets/global";
.p-inputtext {
  @include fluid(font-size, 14px);
  @include fluid(border-radius, 16px);
  @include fluid(min-height, 40px);
  background: transparent;
  color: white;
}
.p-floatlabel {
  background: transparent;
}
label {
  color: white !important;
  @include fluidImportant(font-size, 12px);
  --p-floatlabel-on-active-background:  #404657
}
</style>