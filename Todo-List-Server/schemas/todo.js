const { getAllFromDB, insertNewTodo } = require("../models/Todo");

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
    getTodos: [Todo]
}
type Mutation {
    postTodo(todo: inputTodo): String
}
`;

const resolvers = {
    Query: {
        getTodos: async (_, __, contextValue) => {
            try {
                let todos = await getAllFromDB();
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
                const { title } = args.todo;
                const result = await insertNewTodo(title);
                return result;
            } catch (error) {
<<<<<<< Updated upstream
                console.log(error, "<<<<<< QUERY GET TODOS");
=======
                console.log(error, "<<<<<< MUTATION POST TODO");
                return `Something went wrong, ${error.message}`;
            }
        },
        patchStatus: async (_, args, contextValue) => {
            try {
                const { id, newStatus } = args;
                const result = await updateStatus(id, newStatus);
                return result;
            } catch (error) {
                console.log(error, "<<<<<<<< MUTATION PATCH STATUS");
>>>>>>> Stashed changes
                return `Something went wrong, ${error.message}`;
            }
        },
    },
};

module.exports = { typeDefs, resolvers };
