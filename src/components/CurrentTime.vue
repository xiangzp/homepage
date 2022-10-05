<template>
  <div class="current-time">
    <div class="time">{{ currentTime }}</div>
    <div class="day">
      {{ currentDay }}<span style="margin-left: 10px">{{ week }}</span>
    </div>
  </div>
</template>

<script setup>
import dayjs from "dayjs";
import { ref, onUnmounted } from "vue";

const currentTime = ref(dayjs().format("hh:mm:ss"));
const currentDay = ref();
const week = ref();
let timer;

function getWeek() {
  let day = dayjs().day();
  switch (day) {
    case 1:
      day = "一";
      break;
    case 2:
      day = "二";
      break;
    case 3:
      day = "三";
      break;
    case 4:
      day = "四";
      break;
    case 5:
      day = "五";
      break;
    case 6:
      day = "六";
      break;
    case 0:
      day = "日";
      break;
  }
  return day;
}

function cal() {
  clearTimeout(timer);
  currentTime.value = dayjs().format("hh:mm:ss");
  currentDay.value = dayjs().format("MM/DD");
  week.value = `周${getWeek()}`;
  timer = setTimeout(() => {
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
