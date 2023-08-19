import { gql } from '@apollo/client';

const DELETE_ARTICLE = gql`
  mutation DeleteArticle($id: ID!) {
    deleteArticle(ID: $id)
  }
`;

export default DELETE_ARTICLE;
