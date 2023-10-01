import { gql } from '@apollo/client';

const ADD_ARTICLE = gql`
  mutation AddArticle($blog: String!, $input: ArticleInput!) {
    addArticle(blog: $blog, input: $input) {
      title
      description
      text
      author
      #image
      tags
    }
  }
`;

export default ADD_ARTICLE;
