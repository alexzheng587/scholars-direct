import { gql } from '@apollo/client';

export const ADD_QUESTION_MUTATION = gql`
mutation addQuestion($title: String, $username: String, $description: String, $time: String, $status: String, $tags: [String]) {
  result: AddQuestion(title: $title, username: $username, description: $description, time: $time, status: $status, tags: $tags) {
    _id
    title
    username
    description
    time
    status
    tags
  }
}`;