import { prisma } from "~/prisma"
import result from "~/server/utils/result"
import { hash } from '~/server/utils/bcrypt'
import { verifySvgCaptcha } from '~/server/utils/captcha'

const { defaultAvatar } = useAppConfig()
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
    // 检查用户是否已存在
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      }
    })
    if (existingUser) {
      return result.error({ message: '用户名或邮箱已被使用!' })
    }
    // 密码加密
    const hashedPassword = await hash(password)
    // 创建新用户
    const user = await prisma.user.create({
      data: {
        email,
        nickname: email,
        avatar: defaultAvatar,
        password: hashedPassword
      }
    })

    console.log('User created', user)

    return result.success({ message: '注册成功'})
  } catch (error:any) {
    return result.error({ message: error ? error.message : '服务器出错!'}) 
  }
})
