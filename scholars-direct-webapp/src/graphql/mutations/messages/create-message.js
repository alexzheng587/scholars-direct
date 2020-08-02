import { gql } from '@apollo/client'

export const CREATE_MESSAGE_MUTATION = gql`
mutation createMessage($threadId: ID, $body: String) {
  result: CreateMessage(threadId: $threadId, body: $body) {
    success
    message
  }
}`;