require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const { typeDefs: bookTypeDefs, resolvers: bookResolvers } = require("./schemas/book");
const { typeDefs: todoTypeDefs, resolvers: todoResolvers } = require("./schemas/todo");

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs: [bookTypeDefs, todoTypeDefs],
    resolvers: [bookResolvers, todoResolvers],
    introspection: true,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
startStandaloneServer(server, {
    listen: { port: process.env.PORT || 4000 },
}).then(({ url }) => {
    console.log(`🚀  Server ready at: ${url}`);
});
