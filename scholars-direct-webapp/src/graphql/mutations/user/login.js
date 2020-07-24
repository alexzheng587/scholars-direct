import { gql } from '@apollo/client'

export const LOGIN_MUTATION = gql`
mutation loginUser($email: String, $password: String) {
  result: LoginUser(email: $email, password: $password) {
    success
    message
    token
  }
}`;