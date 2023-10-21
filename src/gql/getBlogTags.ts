import { gql } from '@apollo/client';

const GET_BLOG_TAGS = gql`
  query GetBlogTags($token: String!, $blog: String!) {
    getBlogTags(token: $token, blog: $blog) {
      tags
    }
  }
`;

export default GET_BLOG_TAGS;
