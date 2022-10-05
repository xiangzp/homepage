<template>
  <div class="current-time">
    <div class="time">{{ currentTime }}</div>
    <div class="day">{{ currentDay }}</div>
  </div>
</template>

<script setup>
import dayjs from "dayjs";
import { ref, onUnmounted } from "vue";

const currentTime = ref(dayjs().format("hh:mm:ss"));
const currentDay = ref(dayjs().format("MM/DD"));

let timer;
function cal() {
  clearTimeout(timer);
  timer = setTimeout(() => {
    currentTime.value = dayjs().format("hh:mm:ss");
    cal();
  }, 1000);
}

cal();

onUnmounted(() => {
  clearTimeout(timer);
});
</script>

<style scoped>
.current-time {
  padding: 20px 0;
  text-align: center;
}

.time {
  font-size: 50px;
  letter-spacing: 8px;
  background: linear-gradient(to right, rgba(99, 225, 255, 0.96), #6b8bff);
  -webkit-background-clip: text;
  color: transparent;
}

.day {
  color: #a5a5a5;
  margin-left: 20px;
}
</style>
