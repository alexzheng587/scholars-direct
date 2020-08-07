import { gql } from '@apollo/client'

export const QUERY_MESSAGE_THREADS = gql`
query messageThreads {
  data: MessageThreads {
    id

    user {
      _id
      username
    }

    latestMessage {
      _id
      shortenedBody
      createdAt
      readAt
      senderId
    }
  }
}`;