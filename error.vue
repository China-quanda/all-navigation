<script setup lang="ts">
const props = defineProps({
  error: Object
})

if(props.error.statusCode === 404){
  console.log('404')
  clearError({ redirect: '/2132' })
}

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div>
    error page
    {{ error }}
    <h2>{{ error.statusCode }}</h2>
    <button @click="handleError">清除错误</button>
  </div>
</template>
