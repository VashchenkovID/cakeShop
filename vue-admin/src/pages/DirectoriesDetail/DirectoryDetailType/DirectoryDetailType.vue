<template>
  <section class="DirectoriesDetailType">
    <div class="DirectoriesDetailType__header">
      <MyText size="x3l" view="ghost" weight="bold"
        >{{ generateNameByParams() }}
      </MyText>
      <MyButton label="Создать" @click="openCreateModal" />
    </div>
    <div v-if="!!items.length" class="DirectoriesDetailType__items">
      <div
        v-for="item in items"
        :key="item.name"
        class="DirectoriesDetailType__item"
      >
        <div class="DirectoriesDetailType__item-title">
          <MyText size="l" weight="semiBold" view="ghost"
            >{{ item.name }}
          </MyText>
          <MyText v-if="item.createdAt" view="dark" size="s"
            >{{ `Создано: ${convertDate(item.createdAt)}` }}
          </MyText>
          <MyText v-if="item.updatedAt" view="dark" size="s"
            >{{ `Обновлено: ${convertDate(item.updatedAt)}` }}
          </MyText>
        </div>
        <div class="DirectoriesDetailType__item-actions">
          <i class="pi pi-pencil DirectoriesDetailType__item-icon"></i>
          <i class="pi pi-trash DirectoriesDetailType__item-icon"></i>
        </div>
      </div>
    </div>
  </section>
  <MyModal
    :title="`Создание ${generateNameByParams(true)}`"
    v-model="modal.create"
  >
    <template #body>
      <DirectoriesDetailCreateType
        :refresh="
          () => {
            fetchTypes();
          }
        "
        :close="
          () => {
            modal.create = false;
          }
        "
      />
    </template>
  </MyModal>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { TypeModel } from "../../../api/models/TypeModel.ts";
import TypeService from "../../../api/requests/typeAPI.ts";
import DirectoriesDetailCreateType from "./DirectoriesDetailCreateType.vue";
import MyModal from "../../../components/ui/MyModal.vue";
import MyText from "../../../components/ui/MyText.vue";
import MyButton from "../../../components/ui/MyButton.vue";

const { params } = useRoute();

const convertDate = (str: string) => {
  return new Date(str).toLocaleDateString();
};
const items = ref<TypeModel[]>([]);
const generateNameByParams = (isTitle?: boolean) => {
  if (isTitle) {
    switch (params.id) {
      case "type":
        return "типа изделия";
      case "filling":
        return "начинки";
      case "biscuit":
        return "бисквита";
      default:
        return "Неизвестный тип справочника";
    }
  } else {
    switch (params.id) {
      case "type":
        return "Тип изделия";
      case "filling":
        return "Начинка";
      case "biscuit":
        return "Бисквит";
      default:
        return "Неизвестный тип справочника";
    }
  }
};
const modal = ref({
  create: false,
  edit: false,
  remove: false,
});

const openCreateModal = () => {
  modal.value.create = true;
};
const fetchTypes = () => {
  TypeService.getCakeTypes().then((r) => {
    if (r.data.length > 0) {
      items.value = r.data;
    }
  });
};

onMounted(async () => {
  if (params.id === "type") {
    fetchTypes();
  }
});
</script>

<style scoped lang="scss">
@import "../../../assets/global";

.DirectoriesDetailType {
  @include fluid(padding, 24px);
  display: flex;
  flex-direction: column;
  @include fluid(gap, 24px);
  align-items: flex-start;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  &__items {
    display: flex;
    @include fluid(gap, 16px);
    align-items: center;
    flex-wrap: wrap;
  }

  &__item {
    background: $blockColor;
    @include fluid(padding, 16px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include fluid(border-radius, 16px);
    @include fluid(width, 265px);
    height: 100%;
    @include fluid(gap, 24px);
    &-title {
      display: flex;
      text-align: left;
      align-items: flex-start;
      justify-content: space-between;
      @include fluid(gap, 8px);
      flex-direction: column;
    }

    &-actions {
      display: flex;
      @include fluid(gap, 16px);
      align-items: center;
    }
    &-icon {
      color: $whiteColor;
      @include fluid(width, 24px);
      @include fluid(height, 24px);
      @include fluid(font-size, 24px);
      display: flex;
      cursor: pointer;
    }
  }
}
</style>
