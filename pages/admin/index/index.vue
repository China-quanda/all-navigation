<template>
  <div class="flex gap-x-4">
    <button>新增文件夹</button>
    <button>新增网站</button>
  </div>


  <el-input v-model="input" style="width: 240px" placeholder="Please input" />
</template>

<script setup lang="ts">
const input = ref('')
</script>

<style scoped lang="scss">

</style>