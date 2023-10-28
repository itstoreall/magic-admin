import { gql } from '@apollo/client';

const UPDATE_BLOG_TAGS = gql`
  mutation UpdateBlogTags($input: HandleBlogTagsInput) {
    updateBlogTags(input: $input)
  }
`;

export default UPDATE_BLOG_TAGS;
