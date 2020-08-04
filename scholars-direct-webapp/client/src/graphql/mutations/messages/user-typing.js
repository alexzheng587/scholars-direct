import { gql } from '@apollo/client'

export const USER_TYPING_MUTATION = gql`
mutation userTyping {
  result: UserTyping { success }
}
`;