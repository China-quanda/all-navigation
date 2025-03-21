<template>
  <div>
    <div class="flex flex-col gap-2 p-4">
      <label class="flex p-2 items-center gap-2 border rounded-md">
        <span class="text-sm text-gray-500">文件夹名称</span>
        <input class="input" type="text" v-model="form.name" placeholder="请输入文件夹名称"></input>
      </label>
      <label class="flex p-2 items-center gap-2 border rounded-md">
        <span class="text-sm text-gray-500">icon</span>
        <input class="input" type="text" v-model="form.url" placeholder="请输入icon"></input>
      </label>
      <label class="flex p-2 items-center gap-2 border rounded-md">
        <span class="text-sm text-gray-500">排序</span>
        <input class="input" type="text" v-model="form.url" placeholder="排序"></input>
      </label>
      <button class="py-2 px-4 text-white hover:text-yellow-100 rounded bg-slate-400" @click="submit">提交</button>
    </div>
   
  </div>
</template>

<script lang="ts" setup>

const form = reactive({
  name: '',
  url: '',
})

function submit() {
  console.log(form)
}
</script>

<style>

</style>