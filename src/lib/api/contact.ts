import { gql } from "@apollo/client";

export const CONTACT_SEND_MESSAGE = gql`
  mutation SendContactMessage($input: ContactMessageInput!) {
    sendContactMessage(input: $input) {
      id
    }
  }
`;