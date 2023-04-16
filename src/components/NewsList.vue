<template>
  <div>
    <div class="news-card">
      <template v-if="news">
        <div style="font-size: 22px; margin-bottom: 20px">{{ news.name }}</div>
        <div v-for="(link, index) in news.list" :key="link.title" class="link">
          <a target="_blank" :href="link.link">
            <div>{{ index + 1 }}、{{ link.title }}</div>
            <div
              v-if="link.picture_url && link.picture_url !== 'null'"
              class="preview_image"
            >
              <img :src="link.picture_url" alt="img" />
            </div>
          </a>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { request } from "../utils/request";

const news = ref();

request.get("https://78bnit.lafyun.com:443/get-news").then((res) => {
  news.value = res.data.data;
});
</script>

<style scoped lang="less">
.news-card {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  color: #333;
  box-sizing: border-box;
  overflow: hidden;

  .link {
    font-size: 14px;
    transition: all 0.3s;
    box-sizing: border-box;

    a {
      color: #555;
      text-decoration: none;
      font-size: 16px;
      line-height: 1.6;
      display: flex;
      justify-content: space-between;

      .preview_image {
        flex: 0 0 70px;
        min-width: 0;
        margin-left: 12px;
        height: 40px;
        border-radius: 8px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 100%;
          object-fit: cover;
          height: 100%;
        }
      }
    }

    &:hover {
      a {
        color: #333;
        text-decoration: underline;
      }
    }
  }

  .link + .link {
    margin-top: 18px;
  }
}
</style>
