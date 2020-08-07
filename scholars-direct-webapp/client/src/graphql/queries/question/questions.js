import {gql} from "@apollo/client";

export const QUERY_QUESTIONS = gql`
query Questions {
  data: Questions {
    _id
    userId
    title
    username
    description
    time
    status
    tags
  }
}`;