<template>
  <div>
    <a-upload
        :file-list="fileList"
        :before-upload="beforeUpload"
        :max-count="1"
        @remove="handleRemove">
      <a-button>
        <upload-outlined></upload-outlined>
        导入键位文件
      </a-button>
    </a-upload>
  </div>
</template>
<script lang="ts" setup>
import {ref} from 'vue';
import {UploadOutlined} from '@ant-design/icons-vue';
import {message, type UploadProps} from 'ant-design-vue';

const emit = defineEmits<{
  (e: 'update:json', json: Record<string, any>): void
}>()

const fileList = ref<UploadProps['fileList']>([]);

const handleRemove: UploadProps['onRemove'] = file => {
  const index = fileList.value.indexOf(file);
  const newFileList = fileList.value.slice();
  newFileList.splice(index, 1);
  fileList.value = newFileList;
};

const beforeUpload = (file: File) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const content = e.target?.result as string;
      // 键位文件解析后的json对象
      const json = JSON.parse(content);
      message.success(`${file.name} 文件读取成功`);
      // 将对象传递给父组件
      emit('update:json', json);
    } catch (error) {
      message.error(`${file.name} 文件解析失败`);
      console.error('JSON 解析失败:', error);
    }
  };
  reader.onerror = () => {
    message.error(`${file.name} 文件读取失败`);
    console.error('文件读取错误');
  };
  reader.readAsText(file);
  fileList.value = [...(fileList.value || []), file];
  return false;
};
defineProps(['getJson'])
</script>

