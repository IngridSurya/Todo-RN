import { Text, View } from "react-native";

export default function CardTask() {
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
                Buy Fresh Vegetables from the{"\n"}Market asdfasdfaskdjflkasjdflkasjdflks
                askldfjlaskdjflas
            </Text>
        </View>
    );
}
