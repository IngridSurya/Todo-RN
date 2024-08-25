const { getTodoByStatus, insertNewTodo, updateStatus } = require("../models/Todo");

const typeDefs = `#graphql
type Todo {
    _id: ID,
    title: String,
    status: String
}
input inputTodo {
    title: String
}
type Query {
    getTodos(status: String): [Todo]
}
type Mutation {
    postTodo(todo: inputTodo): String
    patchStatus(id: String, newStatus: String): String
}
`;

const resolvers = {
    Query: {
        getTodos: async (_, args, contextValue) => {
            try {
                const { status } = args;
                let todos = await getTodoByStatus(status);
                return todos;
            } catch (error) {
                console.log(error, "<<<<<< QUERY GET TODOS");
                return `Something went wrong, ${error.message}`;
            }
        },
    },
    Mutation: {
        postTodo: async (_, args, contextValue) => {
            try {
                console.log(args);
                const { title } = args.todo;
                const result = await insertNewTodo(title);
                return result;
            } catch (error) {
                console.log(error, "<<<<<< MUTATION POST TODO");
                return `Something went wrong, ${error.message}`;
            }
        },
        patchStatus: async (_, args, contextValue) => {
            try {
                console.log(args);
                const { id, newStatus } = args;
                const result = await updateStatus(id, newStatus);
                return result;
            } catch (error) {
                console.log(error, "<<<<<<<< MUTATION PATCH STATUS");
                return `Something went wrong, ${error.message}`;
            }
        },
    },
};

module.exports = { typeDefs, resolvers };
