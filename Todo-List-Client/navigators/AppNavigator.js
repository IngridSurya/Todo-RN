import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import HomeNavigator from "./HomeNavigator";
import AntDesign from "@expo/vector-icons/AntDesign";
import { TouchableOpacity, View } from "react-native";
import { navigate } from "./HomeNavigator";

const Stack = createStackNavigator();

export default function AppNavigator() {
    const handleAddTask = async () => {
        try {
            // console.log(navigate);
            navigate("Todo", { name: "add todo" });
        } catch (error) {
            throw error;
        }
    };
    return (
        <Stack.Navigator>
            {/* <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} /> */}
            <Stack.Screen
                name="Home"
                component={HomeNavigator}
                options={{
                    headerRight: () => {
                        return (
                            <TouchableOpacity onPress={handleAddTask}>
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: "center",
                                        paddingHorizontal: 20,
                                    }}
                                >
                                    <AntDesign name="plus" size={24} color="white" />
                                </View>
                            </TouchableOpacity>
                        );
                    },
                    headerLeft: () => {},
                    headerTitle: "Todo",
                    headerTitleAlign: "center",
                    headerStyle: {
                        backgroundColor: "teal",
                    },
                    headerTitleStyle: { fontSize: 36 },
                    headerTintColor: "#fff",
                }}
            />
            {/* <Stack.Screen
                name="AddTodo"
                component={AddTodoScreen}
                options={{ headerShown: false }}
            /> */}
        </Stack.Navigator>
    );
}
