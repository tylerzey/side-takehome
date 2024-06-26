export const rootSchemaTypeDef = /* GraphQL */ `
  scalar Timezone

  input StringFilter {
    exists: Boolean
    eq: String
    neq: String
    in: [String!]
    nin: [String!]
  }

  type ErrorCause {
    cause: String!
  }

  type Subscription {
    _: String
  }

  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`;
