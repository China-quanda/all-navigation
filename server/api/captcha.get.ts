import {createSvgCaptcha} from '~/server/utils/captcha';
import result from "~/server/utils/result"

export default defineEventHandler(async (event) => {
  return result.success({data: createSvgCaptcha()})
})
