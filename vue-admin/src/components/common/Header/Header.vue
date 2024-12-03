<template>
  <div class="Header">
    <MyText view="ghost" weight="semiBold">Ivasik</MyText>
  </div>
</template>

<script setup lang="ts">
import MyText from "../../ui/MyText.vue";
</script>

<style scoped lang="scss">
@import "../../../assets/global";
.Header {
  @include fluid(height, 48px);
  background: radial-gradient(
    350.94% 343.49% at 51.82% -159.87%,
    #404657 0%,
    rgba(64, 70, 87, 0) 100%
  );
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @include fluid(padding, 16px);
}
</style>
