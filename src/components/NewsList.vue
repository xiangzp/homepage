<template>
  <div>
    <div class="card">
      <template v-if="news">
        <div style="font-size: 22px; margin-bottom: 20px">{{ news.name }}</div>
        <div v-for="link in news.list" :key="link.title" class="link">
          <a target="_blank" :href="link.link">
            <el-icon>
              <Link />
            </el-icon>
            {{ link.title }}
          </a>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { request } from "../utils/request";
import { Link } from "@element-plus/icons-vue";

const news = ref();

request.get("https://78bnit.lafyun.com:443/get-news").then((res) => {
  news.value = res.data.data;
});
</script>

<style scoped lang="less">
.card {
  background: rgba(#000, 0.8);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 0 10px rgba(#000, 0.2);
  height: 100%;
  color: #fff;
  box-sizing: border-box;
  overflow: hidden;

  &:hover {
    overflow: auto;
  }

  .link {
    font-size: 14px;
    transition: all 0.3s;
    a {
      color: #aaa;
      text-decoration: none;
      font-size: 16px;
      transition: color 0.3s;
    }
    &:hover {
      a {
        color: #fff;
      }
    }
  }

  .link + .link {
    margin-top: 8px;
  }
}
</style>
