import { gql } from '@apollo/client'

export const MESSAGE_READ_SUBSCRIPTION = gql`
subscription ($forThreadId: ID) {
  messageRead: MessageRead(forThreadId: $forThreadId) {
    _id
    readAt
  }
}
`;
