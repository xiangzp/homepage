<template>
  <div v-if="props.newsList">
    <div class="text-[20px] mb-[12px]">{{ props.newsList.name }}</div>

    <a
      v-for="(item, index) in props.newsList.list"
      :key="item._id"
      class="link flex justify-between hover:text-[#ffc700]"
      target="_blank"
      :href="item.link"
    >
      <div>{{ index + 1 }}、{{ item.title }}</div>
      <div
        v-if="item.picture_url && item.picture_url !== 'null'"
        class="min-w-[60px] max-w-[60px] h-[30px] flex items-center overflow-hidden rounded-[4px] ml-[8px]"
      >
        <img :src="item.picture_url" alt="img" class="block" />
      </div>
    </a>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

export interface INews {
  name: string
  list: Array<{
    _id: string
    link: string
    title: string
    picture_url?: string
  }>
}

const props = defineProps({
  newsList: Object as PropType<INews>
})
</script>

<style>
.link + .link {
  margin-top: 12px;
}
</style>
