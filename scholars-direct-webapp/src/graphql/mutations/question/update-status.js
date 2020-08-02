import { gql } from '@apollo/client';

export const CHANGE_STATUS_MUTATION = gql`
mutation changeStatus($questionId: ID, $status: String) {
  result: ChangeStatus(questionId: $questionId, status: $status) {
    success
    message
  }
}`;