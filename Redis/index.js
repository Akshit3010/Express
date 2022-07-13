const Redis = require("ioredis");

const client = new Redis({
  port: 6379, // Redis port
  host: "127.0.0.1", // Redis host
});

client.set("name", "akshit");

client.get("name").then((value) => {
  console.log("Redis returned", value);
  client.disconnect();
});
