<template>
  <NewsList :news-list="news" />
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { get36kNews } from '@/apis'
import NewsList from './NewsList.vue'

const news: Ref<any> = ref({})

get36kNews().then((res: any) => {
  res?.data?.data?.list.forEach((item: any) => {
    item.title = item.name
  })
  news.value = res.data.data
})
</script>
