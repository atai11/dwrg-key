<template>
  <div id="main-view">
    <a-space>
      <Upload @update:json="handleUpload"/>
      <a-button @click="download(obj)">导出文件</a-button>
      <a-button @click="goToBili">作者主页</a-button>
      <History/>
    </a-space>
    <Editor :obj="obj"/>
  </div>
</template>

<script setup lang="ts">
import Upload from "../components/Upload.vue";
import {ref} from "vue";
import Editor from "../components/Editor.vue";
import History from "../components/History.vue";
const obj = ref({})

const output = () => {
  console.log(obj.value)
}

const handleUpload = (json: Record<string, any>) => {
  obj.value = json
}

const goToBili = () => {
  window.open("https://space.bilibili.com/175336130", "_blank", "noopener,noreferrer")
}

const download = (json) => {
  const jsonString = JSON.stringify(json)
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'pc_key_setting_data.json'; // 设置下载文件名
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
</script>

<style scoped>
#main-view {
  padding: 3%;
}
</style>