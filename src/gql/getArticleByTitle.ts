import { gql } from '@apollo/client';

const GET_ARTICLE_BY_TITLE = gql`
  query GetArticleByTitle($title: String!) {
    getArticleByTitle(title: $title) {
      id
      title
      article
      author
      ipfs
      views
      tags
      timestamp
    }
  }
`;

export default GET_ARTICLE_BY_TITLE;
