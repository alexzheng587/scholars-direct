import { gql } from '@apollo/client'

export const USER_STATUS_CHANGE_SUBSCRIPTION = gql`
subscription($userIds: [ID]) {
  user: UserStatusChange(userIds: $userIds) {
    id
    username
    email
    status
    socketId
  }
}`;
