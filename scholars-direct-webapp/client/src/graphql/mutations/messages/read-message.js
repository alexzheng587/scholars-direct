import { gql } from '@apollo/client'

export const READ_MESSAGE_MUTATION = gql`
mutation readMessage($messageId: ID) {
  result: ReadMessage(messageId: $messageId) { success }
}`;