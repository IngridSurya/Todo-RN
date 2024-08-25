import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TodoScreen from "../screens/TodoScreen";
import { StatusBar } from "expo-status-bar";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import InProgressScreen from "../screens/InProgressScreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import DoneScreen from "../screens/DoneScreen";
import { Text, View } from "react-native";
import * as React from "react";

const Tab = createMaterialTopTabNavigator();

export const navigationRef = React.createRef();

export function navigate(name, params) {
    navigationRef.current?.navigate(name, params);
}

export default function HomeNavigator({ navigation }) {
    React.useEffect(() => {
        navigationRef.current = navigation;
    }, []);
    return (
        <>
            <StatusBar style="light" backgroundColor="teal" translucent={false} />
            <Tab.Navigator
                screenListeners={({ route }) => {
                    return {
                        tabPress: (e) => {
                            navigation.setOptions({ headerTitle: route.name });
                        },
                    };
                }}
                screenOptions={() => {
                    return {
                        tabBarItemStyle: {
                            height: 160,
                            justifyContent: "center",
                            flex: 1,
                        },
                        tabBarLabelStyle: { textTransform: "none" },
                        tabBarStyle: { backgroundColor: "teal" },
                        tabBarActiveTintColor: "white",
                        swipeEnabled: false,
                    };
                }}
            >
                <Tab.Screen
                    name="Todo"
                    component={TodoScreen}
                    options={({ route }) => {
                        return {
                            tabBarLabel: ({ focused }) => {
                                return (
                                    <>
                                        <View style={{ alignItems: "center" }}>
                                            <MaterialCommunityIcons
                                                name="calendar-clock-outline"
                                                size={focused ? 45 : 35}
                                                color={focused ? "white" : "#a3c9c9"}
                                            />
                                        </View>
                                        <Text
                                            style={{
                                                color: focused ? "white" : "#a3c9c9",
                                                marginHorizontal: 5,
                                                marginTop: 10,
                                                marginBottom: 5,
                                                fontSize: 16,
                                            }}
                                        >
                                            To-Do
                                        </Text>
                                        <View
                                            style={{
                                                display: focused ? "flex" : "none",
                                                borderBottomColor: "#fff",
                                                borderBottomWidth: 2,
                                                marginBottom: 10,
                                            }}
                                        />
                                    </>
                                );
                            },
                        };
                    }}
                />
                <Tab.Screen
                    name="InProgress"
                    component={InProgressScreen}
                    options={({ route }) => {
                        return {
                            tabBarLabel: ({ focused }) => {
                                return (
                                    <>
                                        <View style={{ alignItems: "center" }}>
                                            <AntDesign
                                                name="calendar"
                                                size={focused ? 43 : 33}
                                                color={focused ? "white" : "#a3c9c9"}
                                            />
                                        </View>
                                        <Text
                                            style={{
                                                color: focused ? "white" : "#a3c9c9",
                                                marginHorizontal: 5,
                                                marginTop: 10,
                                                marginBottom: 5,
                                                fontSize: 16,
                                            }}
                                        >
                                            In-Progress
                                        </Text>
                                        <View
                                            style={{
                                                display: focused ? "flex" : "none",
                                                borderBottomColor: "#fff",
                                                borderBottomWidth: 2,
                                            }}
                                        />
                                    </>
                                );
                            },
                        };
                    }}
                />
                <Tab.Screen
                    name="Done"
                    component={DoneScreen}
                    options={{
                        tabBarLabel: ({ focused }) => {
                            return (
                                <>
                                    <View style={{ alignItems: "center" }}>
                                        <MaterialCommunityIcons
                                            name="calendar-check-outline"
                                            size={focused ? 43 : 33}
                                            color={focused ? "white" : "#a3c9c9"}
                                        />
                                    </View>
                                    <Text
                                        style={{
                                            color: focused ? "white" : "#a3c9c9",
                                            marginHorizontal: 5,
                                            marginTop: 10,
                                            marginBottom: 5,
                                            fontSize: 16,
                                        }}
                                    >
                                        Done
                                    </Text>
                                    <View
                                        style={{
                                            display: focused ? "flex" : "none",
                                            borderBottomColor: "#fff",
                                            borderBottomWidth: 2,
                                        }}
                                    />
                                </>
                            );
                        },
                    }}
                />
            </Tab.Navigator>
        </>
    );
}
