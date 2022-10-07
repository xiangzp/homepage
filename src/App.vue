<script setup>
import CurrentTime from "./components/CurrentTime.vue";
import { request } from "./utils/request";
import { ref } from "vue";

const navigates = ref([]);
request.get("https://78bnit.lafyun.com:443/get-navigates").then((res) => {
  try {
    navigates.value = res.data;
  } catch (e) {
    navigates.value = [];
  }
});

let bgImage = ref();
request.get("https://78bnit.lafyun.com:443/get-bing-image").then((res) => {
  try {
    bgImage.value = `https://cn.bing.com${res.data.images[0].url}`;
  } catch (e) {
    bgImage.value = "";
  }
});

const weather = ref({});
request.get("https://78bnit.lafyun.com:443/get-weather").then((res) => {
  try {
    const todayWeather = res.data.data[0];
    weather.value = {
      location: res.data.city,
      weather: `${todayWeather.wea}，当前${todayWeather.tem}°C`,
    };
  } catch (e) {
    weather.value = {};
  }
});
</script>

<template>
  <div class="weather" v-if="weather.location">
    {{ weather.location }}。 {{ weather.weather }}
  </div>
  <div class="bg" :style="{ backgroundImage: `url(${bgImage})` }"></div>
  <div class="homepage">
    <current-time />
    <div class="navigate">
      <div class="urls">
        <a
          class="url"
          v-for="url in navigates"
          :key="url.path"
          :href="url.path"
        >
          <div class="icon">
            <img :src="url.icon" />
          </div>
          <p>{{ url.name }}</p>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(5, 9, 17, 0.99);
  background-size: cover;
  filter: brightness(30%) blur(1px);
  transform: scale(1.01);
  z-index: -1;
}

.homepage {
  width: 90%;
  max-width: 1600px;
  margin: 120px auto 0;
}

.navigate + .navigate {
  margin-top: 20px;
}

.urls {
  display: flex;
  flex-wrap: wrap;
}

.url {
  padding: 20px 30px;
  color: #e8e8e8;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s;
}

.group-name {
  font-weight: 700;
  font-size: 20px;
  position: relative;
  background: linear-gradient(to right, #5cd2ef, #5d80fd);
  -webkit-background-clip: text;
  color: transparent;
}

.url .icon {
  width: 100px;
  height: 100px;
  border-radius: 6px;
  background: #fff;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.url img {
  width: 100%;
  display: block;
}

.url p {
  line-height: 1;
  margin-top: 12px;
  font-size: 12px;
}

.url:hover {
  transform: scale(1.1);
}

.weather {
  position: fixed;
  top: 20px;
  left: 20px;
  color: #e8e8e8;
  font-size: 12px;
}
</style>
