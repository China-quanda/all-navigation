<template>
  <!-- w-[150px] -->
  <div
      class=" inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white  dark:bg-slate-800 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10  border border-solid border-[#e4e7ed] dark:border-[#414243] rounded">
      <div class="hidden lg:flex items-center justify-between">
        <a href="#" class="-m-1.5 p-1.5">
          <span class="sr-only">Your Company</span>
          <img class="h-8 w-auto" src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="logo">
        </a>
        <!-- <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-blue-50" >
            <span class="sr-only">Close menu</span>
            <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
              aria-hidden="true" data-slot="icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button> -->
      </div>


      <div class="mt-6 flow-root">
        <div class="-my-6 divide-y divide-gray-500/10 dark:divide-gray-500/40">

          <div class="space-y-2 py-6">

            <template v-for="item in sideMenu" :key="item.id">
              <a v-if="item.children.length === 0" href="#"
                class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 dark:text-blue-50 hover:bg-gray-50">
                {{ item.name }} - 一级
              </a>
              <div v-else class="-mx-3">
                <button type="button"
                  class="flex w-full items-center justify-between rounded-lg 
                  py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 dark:text-blue-50 hover:bg-gray-50 dark:hover:text-gray-900"
                  aria-controls="disclosure-1" aria-expanded="false">
                  {{ item.name }} - 一级-1
                  <!--
                  Expand/collapse icon, toggle classes based on menu open state.

                  Open: "rotate-180", Closed: ""
                -->
                  <svg class="size-5 flex-none rotate-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                    data-slot="icon">
                    <path fill-rule="evenodd"
                      d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                      clip-rule="evenodd" />
                  </svg>
                </button>
                <!-- 'Product' sub-menu, show/hide based on menu state. -->
                <div class="mt-2 space-y-2" id="disclosure-1">
                  
                  <template v-for="citem in item.children">
                    <a href="#" v-if="citem.children.length === 0"
                      class="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 dark:text-blue-50 hover:bg-gray-50">
                      {{ citem.name }} - 二级
                    </a>
                    <div v-else class="mx-4">
                      <button type="button"
                        class="flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-sm/7 font-semibold text-gray-900 dark:text-blue-50 hover:bg-gray-50 dark:hover:text-gray-900"
                        aria-controls="disclosure-1" aria-expanded="false">
                        {{ citem.name }} - 二级-2
                        <svg class="size-5 flex-none" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                          data-slot="icon">
                          <path fill-rule="evenodd"
                            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                            clip-rule="evenodd" />
                        </svg>
                      </button>
                      <div class="mx-1 mt-2 space-y-2" id="disclosure-1">
                        <a href="#" v-for="ccitem in citem.children"
                          class="block rounded-lg py-2 pr-3 pl-6 text-sm/4 font-semibold text-gray-900 dark:text-blue-50 hover:bg-gray-50">
                          {{ ccitem.name }} - 三级
                        </a>
                      </div>
                    </div>
                  </template>

                </div>
              </div>
            </template>
          </div>
          <!-- <div class="py-6">
              <a href="#"
                class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 dark:text-blue-50 hover:bg-gray-50">Log
                in</a>
            </div> -->
        </div>
      </div>

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

<style></style>