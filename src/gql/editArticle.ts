import { gql } from '@apollo/client';

const EDIT_ARTICLE = gql`
  mutation EditArticle($blog: String!, $id: ID!, $articleInput: ArticleInput!) {
    editArticle(blog: $blog, ID: $id, articleInput: $articleInput)
  }
`;

export default EDIT_ARTICLE;
