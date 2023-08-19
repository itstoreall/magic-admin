import { gql } from '@apollo/client';

const IS_ADMIN = gql`
  query IsAdmin($token: String!, $blog: String!) {
    isAdmin(token: $token, blog: $blog) {
      isAdmin
      author
      blog
    }
  }
`;

export default IS_ADMIN;
