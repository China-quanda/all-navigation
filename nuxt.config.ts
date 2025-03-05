import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  // app:{
  //   baseURL: '/it-navigation/',
  // },
  modules:['@nuxtjs/tailwindcss'],
  devtools: { enabled: true },

  runtimeConfig: {
    // 只在服务器端可用的私有键
    apiSecret: '123',
    // public中的键也可以在客户端使用
    public: {
      apiBase: '/api'
    }
  },

  css: ['~/assets/styles/main.css','~/assets/styles/main.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styles/_colors.scss" as *;'
        }
      }
    }
  },

  compatibilityDate: '2025-03-03'
})