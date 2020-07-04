module.exports = {
  client: {
    name: 'client',
    includes: ['src/**/*.ts'],
    tagName: 'gql',
    addTypename: true,
    service: {
      // remote endpoint
      name: 'sever',
      url: 'http://localhost:4000/graphql',
    },
  },
};
