<template>
  <div class="menu inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white  dark:bg-slate-800 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10  border border-solid border-[#e4e7ed] dark:border-[#414243] rounded">

    
    <div v-if="isShowLogo" class="flex items-center gap-x-3">
      <a href="#" class="-m-1.5 p-1.5">
        <span class="sr-only">Your Company</span>
        <img class="h-8 w-auto" src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="logo">
      </a>
      <span v-if="!isCollapse" class="text-[20px] font-semibold leading-6 text-gray-900 dark:text-gray-100">{{ title }}</span>
    </div>

    <template v-for="item in sideMenu" :key="item.id">
    <DefaultSideBarItem v-if="item.children.length === 0" index="1" >
      <template v-slot:title>
        {{ item.name }}
      </template>
    </DefaultSideBarItem>
    <DefaultSideBarSubMenu v-else index="1">
      <template v-slot:title>
        {{ item.name }}
      </template>
      <DefaultSideBarMenu :sideMenu="item.children"  />
    </DefaultSideBarSubMenu>
  </template>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  sideMenu: {
    type: Array,
    default: () => []
  },
  isCollapse: {
    type: Boolean,
    default: false
  }
})

const { title } = useAppConfig()

const isShowLogo = ref(true)
</script>

<style lang="scss" scoped>
.meun{
  
}
</style>