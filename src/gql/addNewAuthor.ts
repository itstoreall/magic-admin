import { gql } from '@apollo/client';

const ADD_NEW_AUTHOR = gql`
  mutation NewAuthor($input: AddAuthorInput) {
    addAdmin(input: $input) {
      name
      blogs
      coauthors
    }
  }
`;

export default ADD_NEW_AUTHOR;
