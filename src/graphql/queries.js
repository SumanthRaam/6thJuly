/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getContribution = /* GraphQL */ `
  query GetContribution($id: ID!) {
    getContribution(id: $id) {
      id
      name
      relation
      address
      phoneNumber
      amount
      date
      createdAt
      updatedAt
    }
  }
`;
export const listContributions = /* GraphQL */ `
  query ListContributions(
    $filter: ModelContributionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContributions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        relation
        address
        phoneNumber
        amount
        date
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`; 