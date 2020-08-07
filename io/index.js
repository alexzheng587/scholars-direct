import io from 'socket.io';
import adapter from 'socket.io-redis';
import { authorize } from 'socketio-jwt';
import url from 'url';
import { CONNECTION } from '../client/src/constants/videocall';
import { USER_STATUS_CHANGE } from '../schema/subscriptions/constants';
import pubsub from '../schema/subscriptions/pubsub';
import attachEventHandlers from './events';

const redisUrl = url.parse("user:uQRDBTQceMSNCIoN00E5mTxeInXGBfZL@redis-19333.c92.us-east-1-3.ec2.cloud.redislabs.com:19333");
const redisPw = redisUrl.auth;

/**
 * @param {Object} server HTTP server instance
 * @returns {Object} socket.io instance
 */
export default function initIO(server) {
    const instance = io(server);
    instance.adapter(adapter({
        host: redisUrl.hostname,
        port: redisUrl.port,
        auth_pass: redisPw,
    }));
    instance.use(authorize({
        handshake: true,
        secret: 'bad_secret',
    }));

    instance.on(CONNECTION, (socket) => {
        console.log(`socket connected to user ${socket.decoded_token.id}`);
        pubsub.publish(USER_STATUS_CHANGE, { userId: socket.decoded_token.id });
        attachEventHandlers(instance, socket);
    });

    return instance;
}