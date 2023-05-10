<template>
  <div class="flex flex-wrap">
    <a :href="item.path" v-for="item in navigates" :key="item._id" class="navigate-box">
      <div class="navigate-box-img">
        <img :src="item.icon" alt="" class="block w-full" />
      </div>
      <span class="text-[12px] mt-[12px]">{{ item.name }}</span>
    </a>
    <div class="navigate-box cursor-pointer" @click="dialogVisible = true">
      <div class="navigate-box-img">
        <img src="@/assets/plus.svg" />
      </div>
    </div>

    <el-dialog v-model="dialogVisible" width="500px" title="添加导航网址">
      <el-form ref="formRef" :model="formModal" label-width="100px" :rules="formRules">
        <el-form-item label="网址名称" prop="name">
          <el-input placeholder="请输入网址名称" v-model="formModal.name" />
        </el-form-item>
        <el-form-item label="导航路径" prop="path">
          <el-input placeholder="请输入导航路径" v-model="formModal.path" />
        </el-form-item>
        <el-form-item label="图标地址" prop="icon">
          <el-input placeholder="请输入图标地址，如http://xxxx" v-model="formModal.icon" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitNewNavigate">提交</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { getNavigates, submitNavigate } from '@/apis'

const navigates = ref([] as Array<{ path: string; icon: string; name: string; _id: string }>)

getNavigates().then((res: any) => {
  navigates.value = res.data
})

const dialogVisible = ref(false)
const formRef = ref()
const formModal = ref({
  icon: '',
  name: '',
  path: ''
})
const formRules = reactive({
  icon: [{ required: true, message: '请填写图标地址' }],
  name: [{ required: true, message: '请填写名称' }],
  path: [{ required: true, message: '请填写导航地址' }]
})

function submitNewNavigate() {
  formRef.value.validate((valid: any) => {
    if (valid) {
      submitNavigate(formModal.value).then(() => {
        dialogVisible.value = false
        getNavigates()
      })
    }
  })
}
</script>

<style scoped>
.navigate-box {
  @apply p-[12px] flex flex-col items-center justify-start w-[94px] box-border text-center;
}

.navigate-box-img {
  @apply flex items-center justify-center border-xborder border-[1px] rounded-[12px] w-full h-[70px] shadow-md overflow-hidden;
}
</style>
