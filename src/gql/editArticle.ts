import { gql } from '@apollo/client';

const EDIT_ARTICLE = gql`
  mutation EditArticle($id: ID!, $articleInput: ArticleInput) {
    editArticle(ID: $id, articleInput: $articleInput)
  }
`;

export default EDIT_ARTICLE;
