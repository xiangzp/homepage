<script setup>
import CurrentTime from "./components/CurrentTime.vue";
import { request } from "./utils/request";
import { reactive, ref } from "vue";
import { Plus, Location } from "@element-plus/icons-vue";
import NewsList from "./components/NewsList.vue";

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
  <div class="weather" v-if="weather.location">
    <el-icon>
      <Location />
    </el-icon>
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
        <a class="url" @click="addNewNavigate">
          <div class="icon add-plus">
            <el-icon :size="24">
              <Plus />
            </el-icon>
          </div>
        </a>
      </div>
    </div>
    <news-list class="new-list" />
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
.bg {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(5, 9, 17, 0.99);
  background-size: cover;
  filter: brightness(60%);
  z-index: -1;
}

.homepage {
  position: fixed;
  top: 100px;
  left: 20px;
  bottom: 20px;
  right: 420px;
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
  position: fixed;
  top: 20px;
  left: 20px;
  color: #e8e8e8;
  font-size: 12px;
}

.new-list {
  position: fixed;
  right: 20px;
  top: 20px;
  bottom: 20px;
  width: 420px;
}
</style>
