import { gql } from '@apollo/client';

const DELETE_AUTHOR_FROM_BLOG = gql`
  mutation DeleteAuthorFromBlog($input: HandleAuthorInBlogInput) {
    deleteAuthorFromBlog(input: $input)
  }
`;

export default DELETE_AUTHOR_FROM_BLOG;
