import { Text, View } from "react-native";

export default function CardTodo({ title }) {

    return (
        <View
            style={{
                backgroundColor: "#f5f77c",
                height: 100,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                elevation: 3,
            }}
        >
            <Text style={{ fontSize: 16 }}>
                {title}
            </Text>
        </View>
    );
}
