import { StyleSheet } from "react-native";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigators/AppNavigator";
import * as React from "react";

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
            <NavigationContainer theme={navTheme}>
                <AppNavigator />
            </NavigationContainer>
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
