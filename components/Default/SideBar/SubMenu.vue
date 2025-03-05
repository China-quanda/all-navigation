<template>
  <div class="sub-menu" :id="index">

    <button type="button" class="sub-menu-title flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/5 font-semibold text-gray-900 dark:text-blue-50 hover:bg-gray-50 dark:hover:text-gray-900" @click="toggleMenu">
      <slot name="title"></slot>
      <!-- Expand/collapse icon, toggle classes based on menu open state.
        Open: "rotate-180", Closed: ""
      -->
      <svg class="size-5 flex-none" :class="[isOpenMenu && 'rotate-180']" viewBox="0 0 20 20" fill="currentColor"
        data-slot="icon">
        <path fill-rule="evenodd"
          d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
          clip-rule="evenodd" />
      </svg>
    </button>
    <div class="sub-menu-content pl-6" :class="[!isOpenMenu && 'hidden']">
      <slot>

      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  index: string
}>()

const isOpenMenu = ref(false)

function toggleMenu() {
  isOpenMenu.value = !isOpenMenu.value
}
</script>