import { ActivityIndicator, View } from "react-native";

export default function Loading(backgroundColor) {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor }}>
            <ActivityIndicator size="large" />
        </View>
    );
}
