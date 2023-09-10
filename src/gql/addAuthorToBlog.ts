import { gql } from '@apollo/client';

const ADD_AUTHOR_TO_BLOG = gql`
  mutation AddAuthorToBlog($input: HandleAuthorInBlogInput) {
    addAuthorToBlog(input: $input)
  }
`;

export default ADD_AUTHOR_TO_BLOG;
