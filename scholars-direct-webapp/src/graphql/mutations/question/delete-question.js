import { gql } from '@apollo/client';

export const DELETE_QUESTION_MUTATION = gql`
mutation deleteQuestion($questionId: ID) {
  result: DeleteQuestion(questionId: $questionId) {
    success
    message
  }
}`;