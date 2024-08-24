import { gql } from "@apollo/client";

const GET_TODOS = gql`
    query get {
        getTodos {
            _id
            title
            status
        }
    }
`;
const POST_TODO = gql`
    mutation post($todo: inputTodo) {
        postTodo(todo: $todo)
    }
`;

export { POST_TODO, GET_TODOS };
