<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="bg-[#F4F6FB] w-[220px] fixed top-0 left-0 bottom-0">
    <div class="flex flex-col items-center justify-center px-[4px] py-[16px]">
      <img src="./assets/logo.svg" class="block w-[50px] h-[50px]" />
      <span class="mt-[16px] font-[cursive] text-[20px]">Peace And Love</span>
    </div>
  </div>

  <!-- <header
    class="fixed left-[220px] right-0 box-border h-[60px] px-[24px] border-b-[1px] border-xborder"
  >
    <div class="flex items-center h-full">
      <div>首页</div>
    </div>
  </header> -->

  <div class="fixed left-[220px] top-0 bottom-0 right-0 py-[12px] px-[24px]">
    <RouterView />
  </div>
</template>
