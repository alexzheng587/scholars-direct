import { gql } from '@apollo/client'

export const QUERY_USER_ID = gql`
query userId {
  user: User { _id }
}`;