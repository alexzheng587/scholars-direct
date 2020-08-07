import { gql } from '@apollo/client'

export const UPDATE_PROFILE = gql`
mutation UpdateProfile($fullname: String, $school: String, $major: String, $year: Int, $role: String) {
  result: UpdateProfile(
    fullname: $fullname,
    school: $school,
    major: $major
    year: $year
    role: $role
  ) {
    success
   
  }
}`;

