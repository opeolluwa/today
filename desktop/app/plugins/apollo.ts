import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { HttpLink } from "@apollo/client/link/http";
import { createApolloProvider } from "@vue/apollo-option";

const httpLink = new HttpLink({
  uri: "https://orchards.up.railway.app/orchard",
});

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

export const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
});
