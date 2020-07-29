import getSocketById from './get-socket-by-id';
import contactModel from '../../models/contact';

/**
 * @param {string} socketId1 first socketId
 * @param {string} socketId2 2nd socketId
 * @returns {number} contactid associated to that socketId pair
 */
export default async function getContactIdBySocketIds(io, socketId1, socketId2) {
    const socket1 = getSocketById(io, socketId1);
    if (!socket1) throw new Error(`Cannot find socket ${socketId1} in getContactIdBySocketId`);
    const socket2 = getSocketById(io, socketId2);
    if (!socket2) throw new Error(`Cannot find socket ${socketId2} in getContactIdBySocketId`);
    const userId1 = socket1.decoded_token.id;
    const userId2 = socket2.decoded_token.id;
    const contact = await contactModel.findOne({
        $or: [
            {
                $and: [
                    {user1: userId1},
                    {user2: userId2}
                ]
            },
            {
                $and: [
                    {user1: userId2},
                    {user2: userId1}
                ]
            }
        ],

    });
    return contact.id;
}
