import { gql } from '@apollo/client'

export const MESSAGE_THREADS_QUERY = gql`
query messageThreads {
  data: MessageThreads {
    id

    user {
      id
      status
      username
      pictureUrl
    }

    latestMessage {
      id
      shortenedBody
      createdAt
      readAt
      senderId
    }
  }
}`;