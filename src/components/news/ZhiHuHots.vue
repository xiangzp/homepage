<template>
  <NewsList :news-list="news" />
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { getZhihuHots } from '@/apis'
import NewsList from './NewsList.vue'

const news: Ref<any> = ref({})

getZhihuHots().then((res: any) => {
  news.value = res.data.data
})
</script>
