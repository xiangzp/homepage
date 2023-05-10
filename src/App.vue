<script setup lang="ts">
import { ref } from 'vue'
import { RouterView, RouterLink } from 'vue-router'
import SearchInput from '@/components/search/SearchInput.vue'

const links = ref([
  {
    title: '首页',
    to: 'home'
  }
])
</script>

<template>
  <div class="bg-[#F4F6FB] w-[220px] fixed top-0 left-0 bottom-0 z-10">
    <div class="flex flex-col items-center justify-center px-[4px] py-[16px]">
      <img src="./assets/logo.svg" class="block w-[50px] h-[50px]" />
      <span class="mt-[16px] font-[cursive] text-[20px]">Peace And Love</span>
    </div>

    <div
      class="absolute max-h-[340px] top-[300px] left-[12px] right-[12px] bottom-[20px] overflow-hidden rounded-[18px] drop-shadow"
    >
      <BingPic />
    </div>
  </div>

  <header
    class="fixed left-[220px] right-0 box-border h-[60px] px-[24px] border-b-[1px] border-xborder"
  >
    <div class="flex items-center h-full justify-between">
      <ul class="header-menu">
        <li v-for="item in links" :key="item.to">
          <RouterLink
            class="h-[60px] px-[12px] flex items-center relative hover:text-[#ffc700]"
            :to="{ name: item.to }"
            >{{ item.title }}</RouterLink
          >
        </li>
      </ul>

      <div class="h-[36px]">
        <SearchInput />
      </div>
    </div>
  </header>

  <div class="fixed left-[220px] top-[60px] bottom-0 right-0 py-[12px] px-[24px] overflow-auto">
    <RouterView />
  </div>
</template>

<style>
.header-menu .router-link-active::after {
  position: absolute;
  content: '';
  bottom: 0;
  background-color: #ffc700;
  height: 2px;
  left: 0;
  right: 0;
  border-radius: 2px;
}
</style>
