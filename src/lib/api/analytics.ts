import { gql } from "@apollo/client";

export const RECORD_ANALYTICS_EVENT = gql`
  mutation RecordAnalyticsEvent($input: RecordAnalyticsEventInput!, $anonymous: Boolean) {
    recordAnalyticsEvent(input: $input, anonymous: $anonymous)
  }
`;


