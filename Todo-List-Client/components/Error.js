import { Alert, Text, View } from "react-native";

export default function Error(error) {
    Alert.alert(error.message);
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Ooops something went wrong...</Text>
            <Text>Error: {error.message}</Text>
        </View>
    );
}
