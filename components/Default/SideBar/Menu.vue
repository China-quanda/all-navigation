<template>
  <div class="menu inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white  dark:bg-[#131313] rounded ">

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
  }
})
</script>

<style lang="scss" scoped>
.meun{
  
}
</style>