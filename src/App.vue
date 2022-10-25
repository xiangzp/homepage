<script setup>
import CurrentTime from "./components/CurrentTime.vue";
import { request } from "./utils/request";
import { reactive, ref } from "vue";
import { Plus, Location } from "@element-plus/icons-vue";
import NewsList from "./components/NewsList.vue";
import JuejinList from "./components/JuejinList.vue";

const navigates = ref([]);

function getNavigates() {
  request.get("https://78bnit.lafyun.com:443/get-navigates").then((res) => {
    try {
      navigates.value = res.data;
    } catch (e) {
      navigates.value = [];
    }
  });
}

getNavigates();

const bgImage = ref();
const bgImageDesc = ref({});
request.get("https://78bnit.lafyun.com:443/get-bing-image").then((res) => {
  try {
    const imageInfo = res.data.images[0];
    bgImage.value = `https://cn.bing.com${imageInfo.url}`;
    bgImageDesc.value = {
      title: imageInfo.title,
      url: `https://cn.bing.com${imageInfo.quiz}`,
      copyright: imageInfo.copyright,
    };
  } catch (e) {
    bgImage.value = "";
    bgImageDesc.value = {};
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

const dialogVisible = ref(false);
const formRef = ref();
const formModal = ref({
  icon: "",
  name: "",
  path: "",
});
const formRules = reactive({
  icon: [{ required: true, message: "请填写图标地址" }],
  name: [{ required: true, message: "请填写名称" }],
  path: [{ required: true, message: "请填写导航地址" }],
});

function addNewNavigate() {
  dialogVisible.value = true;
}

function submitNewNavigate() {
  formRef.value.validate((valid) => {
    if (valid) {
      request
        .post("https://78bnit.lafyun.com:443/add-navigate", formModal.value)
        .then(() => {
          dialogVisible.value = false;
          getNavigates();
        });
    }
  });
}
</script>

<template>
  <div class="homepage">
    <div class="left-box">
      <div class="card">
        <div class="weather" v-if="weather.location">
          <el-icon>
            <Location />
          </el-icon>
          {{ weather.location }}。 {{ weather.weather }}
        </div>
        <current-time />
      </div>

      <div class="bing-image">
        <div class="bg" :style="{ backgroundImage: `url(${bgImage})` }"></div>
        <div class="bg-desc" v-if="bgImageDesc.url">
          <a :href="bgImageDesc.url">{{ bgImageDesc.title }}</a>
          <div>{{ bgImageDesc.copyright }}</div>
        </div>
      </div>

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
          <a class="url" @click="addNewNavigate">
            <div class="icon add-plus">
              <el-icon :size="24">
                <Plus />
              </el-icon>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div class="right-box">
      <news-list style="flex: 5" class="new-list" />
      <juejin-list style="flex: 4" />
    </div>
  </div>
  <el-dialog v-model="dialogVisible" width="500px" title="添加导航网址">
    <el-form
      ref="formRef"
      :model="formModal"
      label-width="100px"
      :rules="formRules"
    >
      <el-form-item label="网址名称" prop="name">
        <el-input placeholder="请输入网址名称" v-model="formModal.name" />
      </el-form-item>
      <el-form-item label="导航路径" prop="path">
        <el-input placeholder="请输入导航路径" v-model="formModal.path" />
      </el-form-item>
      <el-form-item label="图标地址" prop="icon">
        <el-input
          placeholder="请输入图标地址，如http://xxxx"
          v-model="formModal.icon"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitNewNavigate">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="less">
.bing-image {
  position: relative;
  padding: 20px 12px;
  height: 100px;
  border-radius: 0 50px 50px 0;
  overflow: hidden;

  .bg {
    background-size: cover;
    background-position: center center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    transition: all 0.3s;
  }

  &:hover {
    .bg {
      transform: scale(1.15);
    }
  }

  .bg-desc {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0 0 10px 10px;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.1));

    a {
      color: #fff;
      text-decoration: none;
      display: block;
      font-size: 14px;

      &:hover {
        color: #eee;
      }
    }

    div {
      color: #fff;
      font-size: 10px;
      margin-top: 4px;
    }
  }
}

.card {
  padding: 12px 20px;
}

.homepage {
  display: flex;
}

.left-box {
  flex: 0 0 600px;
}

.right-box {
  width: 100%;
  display: flex;
  margin-left: 20px;
}

.navigate {
  margin-top: 20px;
}

.urls {
  display: flex;
  flex-wrap: wrap;
}

.url {
  box-sizing: border-box;
  flex: 0 0 20%;
  padding: 12px;
  color: #333;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  transition: transform 0.3s;

  .icon {
    width: 80px;
    height: 80px;
    border-radius: 6px;
    background: #fff;
    display: flex;
    align-items: center;
    overflow: hidden;
    justify-content: center;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }

  .add-plus {
    background: transparent;
    border: 1px dashed #d8d8d8;
    cursor: pointer;
  }

  img {
    width: 100%;
    display: block;
  }

  p {
    line-height: 1;
    margin-top: 12px;
    font-size: 12px;
  }

  &:hover {
    transform: scale(1.1);
  }
}

.group-name {
  font-weight: 700;
  font-size: 20px;
  position: relative;
  background: linear-gradient(to right, #5cd2ef, #5d80fd);
  -webkit-background-clip: text;
  color: transparent;
}

.weather {
  color: #555;
  font-size: 12px;
  display: flex;
  align-items: center;
}
</style>
