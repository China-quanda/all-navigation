import Redis from 'ioredis'
const { redisConfig } = useRuntimeConfig();

export const redis = new Redis({
  host: redisConfig.host,
  port: redisConfig.port,
  password: redisConfig.password,
})// 默认连接到 localhost:6379