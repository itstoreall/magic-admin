import { gql } from '@apollo/client';

const DELETE_ADMIN = gql`
  mutation DeleteAdmin($input: HandleAuthorInput) {
    deleteAdmin(input: $input)
  }
`;

export default DELETE_ADMIN;
