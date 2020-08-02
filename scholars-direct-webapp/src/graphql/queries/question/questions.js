import {gql} from "@apollo/client";

export const QUERY_QUESTIONS = gql`
query Questions {
  data: Questions {
    _id
    title
    username
    description
    time
    status
    tags
  }
}`;