import { gql } from '@apollo/client'

export const QUERY_PROFILE = gql`
query Profile {
  data: Profile {
    _id
    email
    username
    role
    school
    major
    year
    fullname
  }
}`;