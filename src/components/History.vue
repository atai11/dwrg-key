<script setup lang="ts">
  import {ref} from "vue";

  const open = ref(false)
</script>

<template>
  <a-button @click="open=true">更新记录</a-button>
  <a-modal v-model:open="open" title="更新记录">
    <p>
      2025/12/6<br/>
      1.更新了监管者“女王蜂”相关键位。
    </p>
    <p>
      2025/11/12 <br/>
      1.更新了求生者“幻灯师”相关键位（静物投影、定格自己、解除密码机定格）。<br/>
      2.更新了求生者“牛仔”相关键位（设置套索目标为默认、设置仅套中角色、设置仅套中场景组件）。<br/>
      3.更新了求生者“医生”相关键位（药物增效剂）。<br/>
      4.更新了求生者“幸运儿”相关键位（玩具匣替换玩具2，注：仅是同步“其他模式”中的通用的相应按键，并没有新键位）。
    </p>
    <p>
      2025/9/9 <br/>
      1.更新了监管者“台球手”相关键位。<br/>
      2.更新了娱乐模式“林中童话”相关键位。
    </p>
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