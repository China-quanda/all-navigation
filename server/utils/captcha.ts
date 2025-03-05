import * as svgCaptcha from 'svg-captcha';
import { v4 as uuidv4 } from 'uuid';
import { redis } from '~/server/utils/redis';

export const createSvgCaptcha = (options?: svgCaptcha.ConfigObject) => {

  const captcha = svgCaptcha.create({
    size: 4,
    ignoreChars: '0o1i',
    noise: 2,
    color: true,
    width: 100,
    height: 40,
    background: "#fff",
    ...options
  });

  const uuid = `captcha:${uuidv4()}`;

  redis.setex(uuid, 60*5, captcha.text.toLowerCase())

  const result = {
    uuid,
    captcha: captcha.data,
  };

  return result;
}

export const verifySvgCaptcha = async (body:any) => {
  const { captcha, uuid } = body;
  // 验证码是否存在
  if (!captcha || !uuid) {
    throw new Error('验证码错误！')
  }
  // 验证码是否存在
  const redisCaptcha = await redis.get(uuid);
  if (!redisCaptcha) {
    throw new Error('验证码已过期！')
  }
  // 验证码是否正确
  if (captcha.toLowerCase() !== redisCaptcha.toLowerCase()) {
    throw new Error('验证码错误！')
  }
  return true;
}