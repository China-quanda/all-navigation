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
    },
    mode:process.env.NODE_ENV,
    securityConfig: { // jwt Config
      secret: process.env.SECURITY_SECRET,
      refreshSecret: process.env.SECURITY_REFRESH_SECRET,
      expiresIn: process.env.SECURITY_EXPIRES_IN,
      refreshIn: process.env.SECURITY_REFRESH_IN,
      bcryptSaltOrRound: Number(process.env.SECURITY_BCRYPT_SALT_OR_ROUND),
    },
    redisConfig:{ // redis Config
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
      password: process.env.REDIS_PASSWORD,
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