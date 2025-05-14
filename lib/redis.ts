import Redis from "ioredis";

const redis = new Redis({
  enableReadyCheck: false,
  host: "localhost",
  port: 6379,
  username: "meeran",
  password: "0786",
});

export default redis;
