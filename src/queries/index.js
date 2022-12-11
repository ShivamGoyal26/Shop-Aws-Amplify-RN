export const myProducts = /* GraphQL */ `
  query MyProducts($id: ID!) {
    productsByUserID(userID: $id) {
      items {
        id
        image
        name
        price
        description
        updatedAt
      }
    }
  }
`;

export const getAllProducts = /* GraphQL */ `
  query MyQuery {
    listProducts {
      items {
        name
        image
        description
        id
        price
        updatedAt
      }
    }
  }
`;
