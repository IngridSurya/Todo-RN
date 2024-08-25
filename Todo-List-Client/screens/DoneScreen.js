import { Alert, Dimensions, FlatList, Text, TextInput, View } from "react-native";
import CardTodo from "../components/CardTodo";
import { SwipeListView } from "react-native-swipe-list-view";
import React, { useEffect, useState } from "react";
import { GET_TODOS, POST_TODO, PATCH_TODO_STATUS } from "../queries/todo";
import { useMutation, useQuery } from "@apollo/client";

import Loading from "../components/Loading";
import ErrorC from "../components/Error";

export default TodoScreen = ({ route }) => {
    const { data, loading, error } = useQuery(GET_TODOS, { variables: { status: "Done" } });
    const [patchTodoStatus, { loading: reLoading, error: reError }] = useMutation(
        PATCH_TODO_STATUS,
        { refetchQueries: [GET_TODOS] }
    );

    const onLeftAction = async (rowKey, rowMap) => {
        //swipe from left to right
        try {
            const result = await patchTodoStatus({
                variables: {
                    patchStatusId: data.getTodos[rowKey]._id,
                    newStatus: "Deleted",
                },
            });
            if (result.data.patchStatus !== "Success") {
                throw new Error(result.data.patchStatus);
            }
        } catch (err) {
            console.log(err.message ? err.message : err, "<<<<<<<<<<<<<<<< ON LEFT ACTION");
            Alert.alert("Ooops", err.message ? err.message : err);
        }
    };
    const onRightAction = async (rowKey, rowMap) => {
        //swipe from right to left
        try {
            const result = await patchTodoStatus({
                variables: {
                    patchStatusId: data.getTodos[rowKey]._id,
                    newStatus: "In Progress",
                },
            });
            if (result.data.patchStatus !== "Success") {
                throw new Error(result.data.patchStatus);
            }
        } catch (err) {
            console.log(err.message ? err.message : err, "<<<<<<<<<<<<<<<< ON RIGHT ACTION");
            Alert.alert("Ooops", err.message ? err.message : err);
        }
    };
    if (loading || reLoading) {
        return Loading("#29A887");
    }
    if (error) {
        return ErrorC(error, "#29A887");
    }
    if (reError) {
        return ErrorC(reError, "#29A887");
    }
    return (
        <>
            <View style={{ flex: 1, backgroundColor: "#29A887" }}>
                <SwipeListView
                    useFlatList={true}
                    data={data.getTodos.map((todo, idx) => {
                        return {
                            key: idx,
                            todo,
                        };
                    })}
                    renderItem={(rowData, rowMap) => {
                        return <CardTodo title={rowData.item.todo.title} />;
                    }}
                    renderHiddenItem={(rowData, rowMap) => {
                        return (
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    backgroundColor: "gold",
                                    borderRadius: 10,
                                    opacity: 0.7,
                                }}
                            >
                                <View
                                    style={{
                                        width: 75,
                                        justifyContent: "center",
                                        paddingLeft: 8,
                                    }}
                                >
                                    <Text style={{ color: "red" }}>Swipe Right to Delete Todo</Text>
                                </View>
                                <View style={{ flex: 1 }}></View>
                                <View
                                    style={{
                                        width: 75,
                                        justifyContent: "center",
                                        paddingRight: 8,
                                    }}
                                >
                                    <Text style={{ color: "red" }}>
                                        Swipe Left to Update Todo to In-Progress
                                    </Text>
                                </View>
                            </View>
                        );
                    }}
                    leftActivationValue={200}
                    leftActionValue={Dimensions.get("window").width}
                    onLeftAction={onLeftAction}
                    rightActivationValue={-200}
                    rightActionValue={-Dimensions.get("window").width}
                    onRightAction={onRightAction}
                    contentContainerStyle={{
                        gap: 20,
                        padding: 20,
                    }}
                />
                <Text style={{ color: "white", paddingLeft: 4, backgroundColor: "violet" }}>
                    Swipe to Right/Left to Update Todo's Status
                </Text>
            </View>
        </>
    );
};
