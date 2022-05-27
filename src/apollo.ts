import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";

const httpLink = createHttpLink({
    uri: process.env.NODE_ENV==="production" ? process.env.REACT_APP_URI : "http://localhost:4000/graphql",
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});