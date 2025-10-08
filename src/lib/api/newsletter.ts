import { gql } from "@apollo/client";

export const SUBSCRIBE_TO_NEWSLETTER = gql`
  mutation SubscribeToNewsletter($input: SubscribeEmailInput!) {
    subscribeToNewsletter(input: $input)
  }
`;

export const UNSUBSCRIBE_FROM_NEWSLETTER = gql`
  mutation UnsubscribeFromNewsletter($email: String!) {
    unsubscribeFromNewsletter(email: $email)
  }
`;
