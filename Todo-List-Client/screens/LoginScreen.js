import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import Styles from "../styles/Styles";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";

export default LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");

    const handleLogin = () => {
        console.log("LOGIN");
        navigation.navigate("Home");
    };

    return (
        <>
            <StatusBar style="auto" />
            <View
                style={{
                    flex: 1,
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "pink",
                }}
            >
                <View
                    style={{
                        backgroundColor: "#73bab5",
                        width: "80%",
                        height: 450,
                        alignItems: "center",
                        justifyContent: "flex-end",
                        borderRadius: 20,
                        padding: 20,
                        gap: 20,
                        elevation: 8,
                    }}
                >
                    <View style={{ flex: 2, width: "100%", borderRadius: 90, elevation: 8 }}>
                        <Image
                            source={{
                                uri: "https://www.proofhub.com/articles/wp-content/uploads/2023/11/Best-To-Do-List-Apps-For-Better-Task-Management.jpg",
                            }}
                            style={{ flex: 1, width: "100%", borderRadius: 90 }}
                        />
                    </View>
                    <View style={{ flex: 1, width: "100%", gap: 8 }}>
                        <TextInput
                            placeholder="Your email address..."
                            autoCapitalize="none"
                            style={Styles.TextInput_XL}
                            value={email}
                            onChangeText={setEmail}
                        />
                        <TextInput
                            placeholder="Your password..."
                            autoCapitalize="none"
                            style={Styles.TextInput_XL}
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    <View style={{ flex: 1, width: "100%", gap: 8 }}>
                        <TouchableOpacity style={Styles.Button_XL} onPress={handleLogin}>
                            <Text style={{ color: "white", fontWeight: "500", fontSize: 16 }}>
                                Login
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={Styles.Button_XL}>
                            <Text style={{ color: "white", fontWeight: "500", fontSize: 16 }}>
                                Register
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    );
};
