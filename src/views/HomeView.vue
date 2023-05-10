<script lang="ts" setup>
import NavigateList from '@/components/navigates/NavigateList.vue'
import ZhiHuHots from '@/components/news/ZhiHuHots.vue'
import KNews from '@/components/news/36KNews.vue'
</script>

<template>
  <div>
    <NavigateList />

    <div class="flex mt-[8px]">
      <ZhiHuHots class="flex-1" />
      <KNews class="flex-1 ml-[24px]" />
    </div>
  </div>
</template>
