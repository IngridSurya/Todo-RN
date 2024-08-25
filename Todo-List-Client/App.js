import { StyleSheet } from "react-native";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { ApolloProvider } from "@apollo/client";
import AppNavigator from "./navigators/AppNavigator";
import * as React from "react";
import client from "./config/apollo";

const navTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: "white",
    },
};

export default function App() {
    return (
        <>
            <ApolloProvider client={client}>
                <NavigationContainer theme={navTheme}>
                    <AppNavigator />
                </NavigationContainer>
            </ApolloProvider>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
