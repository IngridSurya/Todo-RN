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
<<<<<<< Updated upstream
    uri: "https://c685-103-136-56-243.ngrok-free.app",
=======
    uri: "https://todo.demo-ingrid.my.id",
>>>>>>> Stashed changes
});

const client = new ApolloClient({
    link: from([errorLink, httpLink]), // `httpLink` must be the last
    cache: new InMemoryCache(),
});

export default client;
