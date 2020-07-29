import { gql } from '@apollo/client'

export const LOGIN_MUTATION = gql`
mutation Login($email: String, $password: String) {
  result: Login(email: $email, password: $password) {
    success
    message
    token
  }
}`;