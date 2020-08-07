import { gql } from '@apollo/client'

export const USER_UPDATE_SUBSCRIPTION = gql`
subscription($userIds: [ID]) {
  user: UserUpdate(userIds: $userIds) {
    _id
    username
    email
  }
}`;
