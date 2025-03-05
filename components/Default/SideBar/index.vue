<template>
  <div class=" border border-solid border-[#e4e7ed] dark:border-[#414243] rounded p-6">
    <div v-if="isShowLogo" class="flex items-center gap-x-3 mb-8">
      <a href="#" class="">
        <span class="sr-only">Your Company</span>
        <img class="h-8 w-auto" src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="logo">
      </a>
      <span v-if="!isCollapse" class="text-[20px] font-semibold leading-6 text-gray-900 dark:text-gray-100">{{ title }}</span>
    </div>
    <DefaultSideBarMenu :sideMenu="sideMenu"  />
  </div>
</template>

<script setup lang="ts">
const { title } = useAppConfig()
const isShowLogo = ref(true)
const sideMenu = ref([
  {
    id: 0,
    name: 'Features',
    icon: '',
    children: []
  },
  {
    id: 0,
    name: 'Marketplace',
    icon: '',
    children: []
  },
  {
    id: 0,
    name: 'Company',
    icon: '',
    children: []
  },
  {
    id: 0,
    name: 'Product',
    icon: '',
    children: [
      {
        id: 0,
        name: 'Analytics',
        icon: '',
        children: []
      },
      {
        id: 0,
        name: 'Engagement',
        icon: '',
        children: []
      },
      {
        id: 0,
        name: 'Security',
        icon: '',
        children: []
      },
      {
        id: 0,
        name: 'Integrations',
        icon: '',
        children: []
      },
      {
        id: 0,
        name: 'Automations',
        icon: '',
        children: []
      },
      {
        id: 0,
        name: 'Watch demo',
        icon: '',
        children: []
      },
      {
        id: 0,
        name: 'Contact sales',
        icon: '',
        children: []
      }
    ]
  },
  {
    id: 0,
    name: 'Quanda',
    icon: '',
    children: [
      {
        id: 0,
        name: 'Quanda1',
        icon: '',
        children: [
          {
            id: 0,
            name: 'Quanda1-1',
            icon: '',
            children: []
          },
          {
            id: 0,
            name: 'Quanda1-2',
            icon: '',
            children: []
          }
        ]
      },
      {
        id: 0,
        name: 'Quanda2',
        icon: '',
        children: [
          {
            id: 0,
            name: 'Quanda2-2',
            icon: '',
            children: []
          }
        ]
      },
      {
        id: 0,
        name: 'Quanda3',
        icon: '',
        children: []
      }
    ]
  }
])
</script>

<style lang="scss" scoped>

</style>