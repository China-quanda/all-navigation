import { useMyStorage } from '~/composables/useMyStorage'
const { getStorage } = useMyStorage();
export default defineNuxtRouteMiddleware((to, from) => {
  // 在服务器端跳过中间件
  if (process.server) return

  // token
  const tokens = getStorage('tokens')

  // 白名单路由，不需要 token 即可访问
  const whiteList = [
    '/auth/signIn',
    '/auth/signin',
    '/auth/signUp',
    '/auth/signup',
    '/auth/forgotPassword',
  ]

  // console.log(to.path, to, whiteList.includes(to.path))

  if (tokens) {
    console.log('有token')
    if (whiteList.includes(to.path)) {
      console.log('有token-在白名单路由')
      return navigateTo('/')
    } else {
      console.log('有token-非白名单路由')
      return
    }
  } else {
    console.log('没有token')
    if (whiteList.includes(to.path)) {
      console.log('没有token-在白名单路由')
      return 
    } else {
      console.log('没有token-2非白名单路由')
      clearError()
      return navigateTo({
        path: '/auth/signin',
        query: {
          redirect: to.path,
          code: 401,
          message: '请先登录'
        }
      })
    }
  }
})
