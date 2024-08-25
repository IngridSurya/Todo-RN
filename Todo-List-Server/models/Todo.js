const { ObjectId } = require("mongodb");
const database = require("../config/mongodb");

module.exports = class Todo {
    static todoCollection() {
        return database.collection("todos");
    }
    static async getTodoByStatus(status) {
        try {
            const agg = [{ $match: { status } }, { $sort: { createdAt: -1 } }];
            const result = await Todo.todoCollection().aggregate(agg).toArray();
            return result;
        } catch (error) {
            console.log(error, "<<<<<<<<< MODEL TODO");
            throw error;
        }
    }
    static async insertNewTodo(title) {
        try {
            await Todo.todoCollection().insertOne({
                title,
                status: "Not Started",
                createdAt: new Date(),
            });
            return `Success`;
        } catch (error) {
            console.log(error, "<<<<<<<< MODEL INSERT NEW TODO");
            throw error;
        }
    }
    static async getOneById(id) {
        try {
            let todo = await Todo.todoCollection().findOne({ _id: new ObjectId(String(id)) });
            return todo;
        } catch (error) {
            console.log(error, "<<<<<<< MODEL GET ONE BY ID");
            throw error;
        }
    }
    static async updateStatus(id, newStatus) {
        try {
            if (!["Not Started", "In Progress", "Done", "Deleted"].includes(newStatus)) {
                throw new Error("New Status Invalid");
            }
            const todo = await Todo.getOneById(id);
            if (!todo) {
                throw new Error("Todo Not Found");
            }

            await Todo.todoCollection().updateOne(
                { _id: new ObjectId(String(id)) },
                { $set: { status: newStatus } }
            );
            return "Success";
        } catch (error) {
            console.log(error, "<<<<<<<<<< MODEL UPDATE STATUS");
            throw error;
        }
    }
};
