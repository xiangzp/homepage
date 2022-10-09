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
  background: #111;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 0 10px rgba(#000, 0.2);
  height: 100%;
  color: #fff;
  box-sizing: border-box;
  overflow: hidden;

  /* 滚动条整体 */

  &::-webkit-scrollbar {
    height: 20px;
    width: 4px;
  }

  /* 两个滚动条交接处 -- x轴和y轴 */

  &::-webkit-scrollbar-corner {
    background-color: transparent;
  }

  /* 滚动条滑块 */

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #535353;
  }

  /* 滚动条轨道 */

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #000;
  }

  &:hover {
    overflow-y: auto;
  }

  .link {
    font-size: 14px;
    transition: all 0.3s;
    width: 372px;
    box-sizing: border-box;

    a {
      color: #bbb;
      text-decoration: none;
      font-size: 16px;
      line-height: 1.6;
    }

    &:hover {
      a {
        color: #fff;
        text-decoration: underline;
      }
    }
  }

  .link + .link {
    margin-top: 18px;
  }
}
</style>
