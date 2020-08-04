import { gql } from '@apollo/client'

export const QUERY_CONTACTS = gql`
query Contacts {
  data: Contacts {
    id
    user {
      _id
      username
      email
      status
      socketId
    }
  }
}`;