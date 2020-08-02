import { gql } from '@apollo/client'

export const USER_TYPING_SUBSCRIPTION = gql`
subscription($currentlyMessagingUser: ID) {
  userTyping: UserTyping(currentlyMessagingUser: $currentlyMessagingUser)
}`;
