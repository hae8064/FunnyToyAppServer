const redis = reqire('redis');
const redisClient = redis.createClient({
  socket: {
    port: 6379,
    host: 'localhost',
  },
});

module.exports = redisClient;
