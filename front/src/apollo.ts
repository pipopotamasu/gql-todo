import ApolloClient, { InMemoryCache } from 'apollo-boost';

export const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache({
    freezeResults: true,
  }),
  assumeImmutableResults: true
});
