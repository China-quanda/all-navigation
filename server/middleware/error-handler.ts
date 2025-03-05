export default defineEventHandler(async (event) => {
  try {
    // 处理请求逻辑...
    // console.log(event)
    // console.log('req--',event.node.req)
    // console.log('res--',event.node.res)
  } catch (error) {
    // console.log('error--',error)
    // return sendRedirect(event, '/404',404); // 重定向到 404 页面
  }
  // return 'Hello Nitro'
})

