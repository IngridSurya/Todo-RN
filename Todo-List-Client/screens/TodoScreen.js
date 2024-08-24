import { Alert, FlatList, Text, TextInput, View } from "react-native";
import CardTodo from "../components/CardTodo";
import React, { useEffect, useState } from "react";
import { POST_TODO, GET_TODOS } from "../queries/todo";
import { useMutation, useQuery } from "@apollo/client";

import Loading from "../components/Loading";
import Error from "../components/Error";

export default TodoScreen = ({ route }) => {
    const { data, loading, error } = useQuery(GET_TODOS);
    const [isAddTodo, setIsAddTodo] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [postTodo] = useMutation(POST_TODO, {
        refetchQueries: [GET_TODOS],
    });

    useEffect(() => {
        if (route.params?.name === "add todo") {
            setTimeout(() => {
                setIsAddTodo(true);
            }, 350);
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
            console.log(error, "<<<<<< ADD NEW TODO");
        }
    };

    const handleOnEditing = async () => {
        if (newTitle.trim().length === 0) {
            setIsAddTodo(false);
            return;
        }
        Alert.alert("Ooops...", "Do you want to add New Todo?", [
            {
                text: "Yes",
                onPress: async () => {
                    console.log("Success add");
                    setIsAddTodo(false);
                    await AddNewTodo();
                    setNewTitle("");
                },
            },
            {
                text: "No",
                onPress: () => {
                    console.log("Cancel");
                    setIsAddTodo(false);
                    setNewTitle("");
                },
            },
        ]);
    };

    if (loading) {
        return Loading();
    }
    if (error) {
        return Error(error);
    }
    // console.log(loading, error, data.getTodos);
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
                                onEndEditing={handleOnEditing}
                                style={{
                                    padding: 20,
                                }}
                            />
                        </View>
                    </View>
                )}
                <FlatList
                    data={data.getTodos}
                    contentContainerStyle={{
                        gap: 20,
                        padding: 20,
                    }}
                    renderItem={({ item }) => {
                        return <CardTodo title={item.title} />;
                    }}
                    keyExtractor={(item, idx) => idx}
                />
            </View>
        </>
    );
};
