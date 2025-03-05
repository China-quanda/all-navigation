<template>

  <div class="flex gap-x-4 h-full p-4">
    <div>
      <DefaultSideBar />
    </div>
    <div class="hidden grid gap-5 w-full justify-center dark:bg-[#131313]"
      style="grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));">
      <div class="flex border-solid border-[1px] border-[#e4e7ed] dark:border-[#414243] bg-white dark:bg-[#1d1e1f] p-[20px] rounded cursor-pointer
    hover:shadow-inner relative overflow-hidden" v-for="i in 20">
        <div class="flex flex-col gap-3">
          <div class="flex gap-2 items-center">
            <div class="w-[35px] h-[35px]">
              <img alt="logo" src="https://cdn.baiwumm.com/logo.png">
            </div>
            <div class="flex flex-col gap-1">
              <div class="text-base dark:text-[#e5eaf3]">
                白雾茫茫
              </div>
              <div class="flex gap-1 items-center text-xs text-slate-400 dark:text-[#94a3b8] font-thin">
                <div class="siteKeyword text-[12px]">
                  前端工程师
                </div>
                <div class="siteKeyword text-[12px]">
                  佛系
                </div>
                <div class="siteKeyword text-[12px]">
                  大龄青年
                </div>
                <div class="siteKeyword text-[12px]">
                  热爱自由
                </div>
              </div>
            </div>
          </div>
          <p class="text-sm text-slate-500 dark:text-[#64748b] font-medium line-clamp-2">
            记录学习、生活和有趣的事，记录学习、生活和有趣的事记录学习、生活和有趣的事记录学习、生活和有趣的事记录学习、生活和有趣的事
          </p>
        </div>
        <div class="flex gap-1 absolute top-1 right-1.5 overflow-x-auto">
          <span
            class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset">推荐</span>
          <span
            class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/10 ring-inset">置顶</span>
          <!-- <span class="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-yellow-600/20 ring-inset">Badge</span>
        <span class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">Badge</span>
        <span class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset">Badge</span>
        <span class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-700/10 ring-inset">Badge</span>
        <span class="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-purple-700/10 ring-inset">Badge</span>
        <span class="inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-pink-700/10 ring-inset">Badge</span> -->
        </div>
      </div>
    </div>
  </div>



</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.siteKeyword {
  &:not(:first-child) {
    padding-left: 3px;
    border-left: 1px solid #f3f4f6;
  }
}
</style>