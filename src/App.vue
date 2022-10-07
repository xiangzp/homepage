<script setup>
import CurrentTime from "./components/CurrentTime.vue";
import { request } from "./utils/request";
import { ref } from "vue";

const navigates = [
  {
    groupName: "",
    urls: [
      {
        icon: new URL("./assets/logo/v2ex@2x.png", import.meta.url).href,
        path: "https://www.v2ex.com/",
        name: "V2EX",
      },
      {
        icon: new URL("./assets/logo/zhihu.png", import.meta.url).href,
        path: "https://www.zhihu.com/",
        name: "知乎",
      },
      {
        icon: new URL("./assets/logo/twitter-6.svg", import.meta.url).href,
        path: "https://www.twitter.com/",
        name: "Twitter",
      },
      {
        icon: new URL("./assets/logo/iconfont.svg", import.meta.url).href,
        path: "https://www.iconfont.cn/",
        name: "iconfont",
      },
      {
        icon: new URL("./assets/logo/bilibili-logo-blue.png", import.meta.url)
          .href,
        path: "https://www.bilibili.com/",
        name: "Bilibili",
      },
      {
        icon: new URL("./assets/logo/juejin.png", import.meta.url).href,
        path: "https://juejin.cn/",
        name: "掘金",
      },
      {
        icon: new URL("./assets/logo/baidufanyi.png", import.meta.url).href,
        path: "https://fanyi.baidu.com/",
        name: "百度翻译",
      },
      {
        icon: new URL("./assets/logo/github.png", import.meta.url).href,
        path: "https://github.com/",
        name: "GitHub",
      },
      {
        icon: new URL("./assets/logo/gitee.svg", import.meta.url).href,
        path: "https://gitee.com/",
        name: "Gitee",
      },
      {
        icon: new URL("./assets/logo/weixindushu.png", import.meta.url).href,
        path: "https://weread.qq.com/",
        name: "微信读书",
      },
      {
        icon: new URL(
          "./assets/logo/weixingongzhongpingtai.svg",
          import.meta.url
        ).href,
        path: "https://mp.weixin.qq.com/",
        name: "微信公众平台",
      },
    ],
  },
];

let bgImage = ref();
request.get("https://78bnit.lafyun.com:443/get-bing-image").then((res) => {
  try {
    bgImage.value = `https://cn.bing.com${res.data.images[0].url}`;
  } catch (e) {
    bgImage.value = "";
  }
});
</script>

<template>
  <div class="bg" :style="{ backgroundImage: `url(${bgImage})` }"></div>
  <div class="homepage">
    <current-time />
    <div class="navigate" v-for="na in navigates" :key="na.groupName">
      <div class="group-name" v-if="na.groupName">{{ na.groupName }}</div>
      <div class="urls">
        <a class="url" v-for="url in na.urls" :key="url.path" :href="url.path">
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
</style>
