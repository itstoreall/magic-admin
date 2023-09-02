import { gql } from '@apollo/client';

const GET_ALL_ADMINS = gql`
  query GetAllAdmins($token: String!) {
    getAllAdmins(token: $token) {
      id
      name
      blogs
    }
  }
`;

export default GET_ALL_ADMINS;
