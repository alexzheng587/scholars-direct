import { gql } from '@apollo/client'

export const CALLING_CONTACT_QUERY = gql`
query callingContact($contactId: ID) {
  data: Contact(contactId: $contactId) {
    id
    user {
      _id
      username
    }
  }
}`;