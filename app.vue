<template>
  <NuxtLayout>
    <!-- <NuxtPage /> -->
  </NuxtLayout>
</template>
<script setup lang="ts">
const appConfig = useAppConfig()

onMounted(()=>{
  document.querySelector('html').classList.add('h-full')
 document.querySelector('body').classList.add('h-full')
 document.querySelector('#__nuxt').classList.add('h-full')

 
})


// console.log(appConfig)
// throw createError({
//   statusCode: 404,
//   statusMessage: 'Page Not Found',
//   data: {
//     myCustomField: true
//   }
// })
</script>
