<template>
  <div
    class="w-full border-[#dfe1e5] border-[1px] h-[50px] rounded-full px-[48px] relative"
    :class="inputActivited && 'shadow-md'"
  >
    <div class="absolute left-0 top-0 bottom-0 flex items-center pl-[10px]">
      <img src="../../assets/search.svg" alt="" class="w-[22px] block" />
    </div>
    <input
      class="block w-full h-full outline-none text-[#333]"
      v-model="searchText"
      @keydown.enter="handleSearch"
      @focus="inputActivited = true"
      @blur="inputActivited = false"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const searchText = ref('')
const inputActivited = ref(false)

const handleSearch = () => {
  location.href = `https://www.google.com.hk/search?q=${searchText.value}`
}
</script>
