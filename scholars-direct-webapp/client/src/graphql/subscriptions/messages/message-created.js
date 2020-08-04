import { gql } from '@apollo/client'

export const MESSAGE_CREATED_SUBSCRIPTION = gql`
subscription($forUserId: ID) {
  messageCreated: MessageCreated(forUserId: $forUserId) {
    _id
    threadId
    body
    readAt
    senderId
    shortenedBody
    createdAt
  }
}`;
