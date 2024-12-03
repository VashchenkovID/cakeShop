<template>
  <component :is="roolEl" :class="['MyText', className, size, weight, view]">
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
interface MyTextProps {
  roolEl?: "p" | "div" | "span";
  className?: string;
  size?: "xs" | "s" | "m" | "l" | "xl" | "x2l" | "x3l" | "x4l";
  weight?: "bold" | "semiBold" | "regular";
  view?: "primary" | "secondary" | "ghost";
}

const {
  roolEl = "p",
  size = "m",
  view = "secondary",
  weight = "regular",
} = defineProps<MyTextProps>();
</script>

<style scoped lang="scss">
@import "../../assets/global";

.xs {
  @include fluid(font-size, 10px, 12px);
  @include fluid(line-height, 14px, 16px);
}

.s {
  @include fluid(font-size, 12px, 14px);
  @include fluid(line-height, 16px, 18px);
}

.m {
  @include fluid(font-size, 14px, 16px);
  @include fluid(line-height, 18px, 20px);
}

.l {
  @include fluid(font-size, 16px, 18px);
  @include fluid(line-height, 20px, 22px);
}

.xl {
  @include fluid(font-size, 18px, 20px);
  @include fluid(line-height, 22px, 24px);
}

.x2l {
  @include fluid(font-size, 20px, 22px);
  @include fluid(line-height, 24px, 26px);
}

.x3l {
  @include fluid(font-size, 22px, 24px);
  @include fluid(line-height, 26px, 28px);
}

.x4l {
  @include fluid(font-size, 24px, 36px);
  @include fluid(line-height, 30px, 36px);
}

.regular {
  font-weight: 400;
}

.semiBold {
  font-weight: 500;
}

.bold {
  font-weight: 600;
}

.primary {
  color: $primaryColor;
}

.secondary {
  color: $secondaryColor;
}

.ghost {
  color: $whiteColor;
}
</style>
