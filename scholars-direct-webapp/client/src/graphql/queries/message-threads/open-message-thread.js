import { gql } from '@apollo/client'

export const QUERY_OPEN_MESSAGE_THREAD = gql`
query openMessageThread($threadId: ID) {
  data: MessageThread(threadId: $threadId) {
    id

    user {
      _id
      username
      status
    }

    messages {
      _id
      body
      senderId
      readAt
    }
  }
}`;
