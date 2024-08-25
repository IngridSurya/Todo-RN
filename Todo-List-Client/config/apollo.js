import { ApolloClient, InMemoryCache, from, createHttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.error(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        );
    if (networkError) console.error(`[Network error]: ${JSON.stringify(networkError, null, 2)})`);
});

const httpLink = createHttpLink({
    uri: "https://1456-86-48-11-226.ngrok-free.app",
});

const client = new ApolloClient({
    link: from([errorLink, httpLink]), // `httpLink` must be the last
    cache: new InMemoryCache(),
});

export default client;
