const database = require("../config/mongodb");

module.exports = class Todo {
    static todoCollection() {
        return database.collection("todos");
    }
    static async getAllFromDB() {
        try {
            const result = await Todo.todoCollection().find().toArray();
            return result;
        } catch (error) {
            console.log(error, "<<<<<<<<< MODEL TODO");
            throw error;
        }
    }
    static async insertNewTodo(title) {
        try {
            await Todo.todoCollection().insertOne({ title, status: "Not Started" });
            return `Success`;
        } catch (error) {
            console.log(error, "<<<<<<<< MODEL INSERT NEW TODO");
            throw error;
        }
    }
};
