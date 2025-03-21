import jwt from 'jsonwebtoken';
const { securityConfig  } = useRuntimeConfig();

export const verifyAccessToken = async (token: string) => {
  return jwt.verify(token, {
    secret: securityConfig.secret,
  });
};

export const verifyeRefreshToken = async (refreshToken: string) => {
  return jwt.verify(refreshToken, {
    secret: securityConfig.refreshSecret,
  });
};

export const generateTokens = async (payload: any):Promise<{ accessToken: string; refreshToken: string; }> => {
  return {
    accessToken: await generateAccessToken(payload),
    refreshToken: await generateRefreshToken(payload),
  };
};

export const generateAccessToken = async (payload: any): Promise<string> => {
  return jwt.sign(
    payload,
    securityConfig.secret,
    {
      expiresIn: securityConfig.expiresIn,
    },
  );
};

export const generateRefreshToken = async (
  payload: any
): Promise<string> => {
  return jwt.sign(
    payload,
    securityConfig.refreshSecret,
    {
      expiresIn: securityConfig.refreshIn,
    },
  );
};