import { gql } from '@apollo/client';

const ADD_ARTICLE = gql`
  mutation AddArticle($input: ArticleInput) {
    addArticle(input: $input) {
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
