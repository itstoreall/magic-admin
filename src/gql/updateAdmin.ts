import { gql } from '@apollo/client';

const UPDATE_ADMIN = gql`
  mutation Admin($input: AccessInput) {
    updateAdmin(input: $input) {
      token
      name
      blogs
    }
  }
`;

export default UPDATE_ADMIN;
