<template>
  <div class="current-time">
    <div class="time">{{ currentTime }}</div>
    <div class="day">
      {{ currentDay }}
      <span style="margin-left: 10px">{{ week }} </span>
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
  currentTime.value = dayjs().format("HH:mm:ss");
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
  display: flex;
  align-items: flex-end;
  color: #333;
}

.time {
  font-size: 50px;
  font-weight: 700;
  letter-spacing: 8px;
}

.day {
  margin-left: 20px;
  margin-bottom: 10px;
}
</style>
