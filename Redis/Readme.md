# Basic REDIS Commands:

## SET (KEY) (VALUE)

- SET name Akshit
- SET age 23

## GET (KEY)

- GET name

## EXISTS (KEY)

- EXISTS name (will return 1)
- EXISTS gender (will return 0)

## INCR (KEY)

- INCR age (will return 24)

### INCRBY (KEY) (VALUE)

- INCRBY age 10 (will return 34)

## DECR (KEY)

- DECR age (will return 33)

### DECRBY (KEY) (VALUE)

- DECRBY age 10 (will return 23)

## SET (KEY) (VALUE) EX (SEC)

- SET jwt 12345 EX 10 (will expire the token after 10 seconds)

## DEL (KEY) (KEY) ...

- DEL age name (will delete both the keys)

## HSET (KEY) (FIELD) (VALUE) (FIELD) (VALUE)

- HSET new_user age 23 name akshit income 100000

## HGET (KEY) (FIELD)

- HGET new_user age (will return 23)

## HSETNX (KEY) (FIELD) (VALUE)

- HSETNX new_user gender male

## HMGET (KEY) (FIELD) (FIELD) ...

- HMGET new_user age name income (will return array [23,akshit,100000])

## HGETALL (KEY)

- HGETALL new_user (will return whole hash i.e object)

## LPUSH (FILED) (VALUE) (VALUE) ...

- LPUSH Projects abc xyz mno

## LRANGE (FIELD) (FROM) (TO)

- LRANGE Projects 0 2

## SADD (KEY) (VALUE) (VALUE) ...

- SADD cricketteam Sachin Virat Dhoni

## SMEMBERS (KEY)

- SMEMBERS cricketteam

## SREM (KEY) (VALUE)

- SREM cricketteam sachin (will delete sachin)

## Official link for more commands

- Redis: [Redis.com](https://redis.io/commands/)
