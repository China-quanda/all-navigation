import * as bcrypt from 'bcrypt';

/**
 * 明文密码与加密后的密码进行比对
 * @param p1 明文密码
 * @param p2 加密后的密码
 * @returns Promise<boolean>
 */
export const compare = (p1: string, p2: string): Promise<boolean> => {
  return bcrypt.compare(p1, p2);
};

/**
 * 加密密码
 * @param password 明文密码
 * @returns Promise<string>
 */
export const hash = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(password, salt);
};
