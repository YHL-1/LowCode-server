const Redis = require('ioredis');
const redis = new Redis({
  host: 'localhost',
  port: 6379,
});

// 监听连接
redis.on('connect', () => {
  console.log('Redis 连接成功');
});

module.exports = redis;