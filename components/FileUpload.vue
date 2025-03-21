<!-- components/FileUpload.vue -->
<template>
  <div>
    <input type="file" accept="text/html" @change="handleFileUpload" />
  </div>
</template>
 
<script setup>
import { ref } from 'vue';
 
const selectedFile = ref(null);
 
const handleFileUpload = (event) => {
  selectedFile.value = event.target.files[0]; // 获取第一个文件
  uploadFile(selectedFile.value);
};
 
const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
 
  try {
    const response = await useFetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    console.log('File uploaded successfully:', response.data.value);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};
</script>