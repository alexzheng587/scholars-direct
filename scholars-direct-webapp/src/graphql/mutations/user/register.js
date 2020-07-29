import { gql } from '@apollo/client'

export const REGISTER_MUTATION = gql`
mutation signupUser($email: String, $username: String, $password: String) {
  result: SignupUser(
    email: $email,
    username: $username,
    password: $password
  ) {
    success
    message
    token
  }
}`;