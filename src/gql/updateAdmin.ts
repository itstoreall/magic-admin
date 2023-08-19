import { gql } from '@apollo/client';

const UPDATE_ADMIN = gql`
  mutation Admin($input: AccessInput) {
    updateAdmin(input: $input) {
      token
      author
      blog
    }
  }
`;

export default UPDATE_ADMIN;
