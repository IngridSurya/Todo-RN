import { Alert, Dimensions, FlatList, Text, TextInput, View } from "react-native";
import CardTodo from "../components/CardTodo";
import { SwipeListView } from "react-native-swipe-list-view";
import React, { useEffect, useState } from "react";
import { GET_TODOS, POST_TODO, PATCH_TODO_STATUS } from "../queries/todo";
import { useMutation, useQuery } from "@apollo/client";

import Loading from "../components/Loading";
import ErrorC from "../components/Error";

export default TodoScreen = ({ route }) => {
    const { data, loading, error } = useQuery(GET_TODOS, { variables: { status: "Not Started" } });
    const [isAddTodo, setIsAddTodo] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [postTodo] = useMutation(POST_TODO, { refetchQueries: [GET_TODOS] });
    const [patchTodoStatus, { loading: reLoading, error: reError }] = useMutation(
        PATCH_TODO_STATUS,
        { refetchQueries: [GET_TODOS] }
    );
    // const [loadingState, setLoadingState] = useState(false);

    useEffect(() => {
        if (route.params?.name === "add todo") {
            setTimeout(() => {
                setIsAddTodo(true);
            }, 400);
        }
    }, [route]);

    const AddNewTodo = async () => {
        try {
            let result = await postTodo({
                variables: {
                    todo: {
                        title: newTitle.trim(),
                    },
                },
            });
            return result.data.postTodo;
        } catch (error) {
            console.log(error, "<<<<<<<<<<<<<<<< ADD NEW TODO");
        }
    };

    const onEndEditing = async () => {
        if (newTitle.trim().length === 0) {
            setIsAddTodo(false);
            return;
        }
        Alert.alert("Ooops...", `Do you want to add "${newTitle}" to your Todo?`, [
            {
                text: "No",
                onPress: () => {
                    console.log("Cancel");
                    setIsAddTodo(false);
                    setNewTitle("");
                },
            },
            {
                text: "Yes",
                onPress: async () => {
                    console.log("Success add");
                    setIsAddTodo(false);
                    await AddNewTodo();
                    setNewTitle("");
                },
            },
        ]);
    };
    const onLeftAction = async (rowKey, rowMap) => {
        //swipe from left to right
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
                    newStatus: "Deleted",
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
                {isAddTodo && (
                    <View
                        style={{
                            padding: 20,
                            borderBottomWidth: 1,
                            borderColor: "teal",
                            elevation: 3,
                        }}
                    >
                        <Text style={{ color: "white" }}>New Todo</Text>
                        <View
                            style={{
                                backgroundColor: "#f5f77c",
                                justifyContent: "center",
                                alignItems: "center",
                                elevation: 3,
                                borderRadius: 10,
                                height: 100,
                            }}
                        >
                            <TextInput
                                value={newTitle}
                                onChangeText={setNewTitle}
                                autoFocus={isAddTodo}
                                multiline
                                onEndEditing={onEndEditing}
                                style={{
                                    padding: 20,
                                }}
                            />
                        </View>
                    </View>
                )}
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
                                    <Text style={{ color: "red" }}>
                                        Swipe Right to Update Todo to In-Progress
                                    </Text>
                                </View>
                                <View style={{ flex: 1 }}></View>
                                <View
                                    style={{
                                        width: 75,
                                        justifyContent: "center",
                                        paddingRight: 8,
                                    }}
                                >
                                    <Text style={{ color: "red" }}>Swipe Left to Delete Todo</Text>
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
