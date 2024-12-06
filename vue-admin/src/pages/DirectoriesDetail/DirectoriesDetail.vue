<template>
  <component :is="component" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import DirectoryDetailType from "./DirectoryDetailType/DirectoryDetailType.vue";

const { params } = useRoute();

const component = computed(() => {
  console.log(params.id);
  switch (params.id) {
    case "type":
      return DirectoryDetailType;
    default:
      return "";
  }
});
console.log(component);
</script>

<style scoped></style>
