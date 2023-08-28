import { gql } from '@apollo/client';

const ADD_NEW_AUTHOR = gql`
  mutation NewAuthor($input: HandleAuthorInput) {
    addAdmin(input: $input) {
      name
      blogs
      coauthors
    }
  }
`;

export default ADD_NEW_AUTHOR;
