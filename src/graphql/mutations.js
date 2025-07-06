/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createContribution = /* GraphQL */ `
  mutation CreateContribution(
    $input: CreateContributionInput!
    $condition: ModelContributionConditionInput
  ) {
    createContribution(input: $input, condition: $condition) {
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
export const updateContribution = /* GraphQL */ `
  mutation UpdateContribution(
    $input: UpdateContributionInput!
    $condition: ModelContributionConditionInput
  ) {
    updateContribution(input: $input, condition: $condition) {
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
export const deleteContribution = /* GraphQL */ `
  mutation DeleteContribution(
    $input: DeleteContributionInput!
    $condition: ModelContributionConditionInput
  ) {
    deleteContribution(input: $input, condition: $condition) {
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