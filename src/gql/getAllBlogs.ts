import { gql } from '@apollo/client';

const GET_ALL_BLOGS = gql`
  query GetAllBlogs($token: String!) {
    getAllBlogs(token: $token) {
      id
      title
      authors
    }
  }
`;

export default GET_ALL_BLOGS;
