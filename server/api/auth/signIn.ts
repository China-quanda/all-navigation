import { prisma } from "~/prisma"
import result from "~/server/utils/result"
import { compare } from '~/server/utils/bcrypt'
import { verifySvgCaptcha } from '~/server/utils/captcha'
import { generateTokens } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password,code, uuid } = body

  try {
    // 验证输入
    if (!email || !password || !code || !uuid) {
      return result.error({ message: '所有字段都是必填的!' })
    }
    // 验证验证码
    const isVerifyCode = await verifySvgCaptcha({captcha:code,uuid})
    if(!isVerifyCode){
      return result.error({ message: '验证码错误!' })
    }
    // 查询用户
    const user = await prisma.user.findFirst({
      where: {
        email,
      }
    })
    // 检查用户是否已存在
    if (!user) {
      return result.error({ message: '用户不存在!' })
    }
    // 检查用户密码是否正确
    const isVerifyPassword = await compare(password, user.password)
    if(!isVerifyPassword){
      return result.error({ message: '密码错误!' })
    }
    // 生成 jwt token
    const tokens = await generateTokens({ id: user.id })

    return result.success({ message: '登录成功',data: tokens })
  } catch (error:any) {
    return result.error({ message: error ? error.message : '服务器出错!'}) 
  }
})
