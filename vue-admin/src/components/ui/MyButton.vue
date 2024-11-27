<template>
  <Button v-bind="props"/>
</template>

<script setup lang="ts">
import {MyButtonProps} from "./interfaces.ts";

const props = defineProps<MyButtonProps>()

</script>

<style scoped lang="scss">
</style>