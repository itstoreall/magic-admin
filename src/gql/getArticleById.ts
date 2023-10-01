import { gql } from '@apollo/client';

const GET_ARTICLE_BY_ID = gql`
  query GetArticleById($blog: String!, $id: ID!) {
    getArticleById(blog: $blog, ID: $id) {
      id
      title
      description
      text
      author
      ipfs
      views
      tags
      timestamp
    }
  }
`;

export default GET_ARTICLE_BY_ID;
