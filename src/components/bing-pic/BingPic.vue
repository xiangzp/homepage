<template>
  <div
    class="bg-no-repeat bg-cover h-full relative overflow-hidden"
    :style="{ backgroundImage: `url(${pic.url})` }"
  >
    <div
      class="absolute bottom-0 left-0 right-0 text-[#fff] px-[12px] py-[8px]"
      style="text-shadow: 0 0 10px rgba(0, 0, 0, 0.5)"
    >
      <div class="text-[14px] mb-[4px]">{{ pic?.desc?.title }}</div>
      <div class="text-[10px]">{{ pic?.desc?.copyright }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { getBingPic } from '@/apis'

const pic: Ref<any> = ref({})

getBingPic().then((res: any) => {
  const imageInfo = res.data.images[0]
  pic.value = {
    url: `https://cn.bing.com${imageInfo.url}`,
    desc: {
      title: imageInfo.title,
      url: `https://cn.bing.com${imageInfo.quiz}`,
      copyright: imageInfo.copyright
    }
  }
})
</script>
