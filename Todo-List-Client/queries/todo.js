import { gql } from "@apollo/client";

const GET_TODOS = gql`
    query get($status: String) {
        getTodos(status: $status) {
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
const PATCH_TODO_STATUS = gql`
    mutation patch($patchStatusId: String, $newStatus: String) {
        patchStatus(id: $patchStatusId, newStatus: $newStatus)
    }
`;

export { GET_TODOS, POST_TODO, PATCH_TODO_STATUS };
