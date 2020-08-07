import { gql } from '@apollo/client'

export const UPDATE_PROFILE = gql`
mutation UpdateUser($fullname: String, $school: String, $major: String, $year: number, $role: String) {
  result: UpdateUser(
    fullname: $fullname,
    school: $school,
    major: $major
    year: $year
    role: $role
    email: $email
  ) {
    success
    result
  }
}`;

