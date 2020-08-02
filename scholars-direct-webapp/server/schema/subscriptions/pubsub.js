import { RedisPubSub } from 'graphql-redis-subscriptions';
import url from 'url';

export * from './constants';

const redisUrl = url.parse("user:uQRDBTQceMSNCIoN00E5mTxeInXGBfZL@redis-19333.c92.us-east-1-3.ec2.cloud.redislabs.com:19333");

export default new RedisPubSub({
    connection: {
        host: "redis-19333.c92.us-east-1-3.ec2.cloud.redislabs.com",
        port: 19333,
        password: "uQRDBTQceMSNCIoN00E5mTxeInXGBfZL",
    },
    retryStrategy: options => Math.max(options.attempt * 100, 3000),
});