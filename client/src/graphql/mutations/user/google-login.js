import { gql } from '@apollo/client'

export const GOOGLE_LOGIN_MUTATION = gql`
mutation GoogleLogin($token: String) {
  result: GoogleLogin(token: $token) {
    success
    name
    token
  }
}`;