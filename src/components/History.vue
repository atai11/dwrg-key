<script setup lang="ts">
  import {ref} from "vue";

  const open = ref(false)
</script>

<template>
  <a-button @click="open=true">更新记录</a-button>
  <a-modal v-model:open="open" title="更新记录">
    <p>
      2025/7/11 <br/>
      1.更新了“清空按键”功能。<br/>
      2.更新了“更新记录”功能。<br/>
      3.“啦啦队员”已更正为“拉拉队员”。
    </p>
    <template #footer>
      <a-button type="primary" @click="open=false">关闭</a-button>
    </template>
  </a-modal>
</template>

<style scoped>

</style>