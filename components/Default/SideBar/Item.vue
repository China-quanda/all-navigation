<template>
  <div class="menu-item" :id="index">
    <div class="menu-item-content">
      <slot>

      </slot>
    </div>
    <div class="menu-item-title cursor-pointer block rounded-lg px-3 py-2 text-base/5 font-semibold text-gray-900 dark:text-blue-50 hover:bg-gray-50">
      <slot name="title"></slot>
    </div>
  </div>

  
  

</template>

<script lang="ts" setup>
defineProps<{
  index: string
}>()
</script>