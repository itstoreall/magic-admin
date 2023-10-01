import { gql } from '@apollo/client';

const DELETE_ARTICLE = gql`
  mutation DeleteArticle($blog: String!, $id: ID!) {
    deleteArticle(blog: $blog, ID: $id)
  }
`;

export default DELETE_ARTICLE;
