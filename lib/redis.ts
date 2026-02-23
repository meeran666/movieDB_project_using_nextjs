import Redis from "ioredis";
console.log(process.env.REDIS_HOST);
const redis = new Redis({
  enableReadyCheck: false,
  host: process.env.REDIS_HOST ?? "",
  port: parseInt(process.env.REDIS_PORT ?? ""),
  username: process.env.REDIS_USER ?? "",
  password: process.env.REDIS_PASSWORD ?? "",
});

redis.on("error", (error) => {
  console.error("Redis error encountered:", error);
  // Implement logic to handle the error (e.g., logging, retrying)
});

export default redis;
