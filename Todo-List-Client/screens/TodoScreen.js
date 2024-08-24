import { FlatList, View } from "react-native";
import CardTask from "../components/CardTask";

export default TodoScreen = () => {
    return (
        <>
            <FlatList
                data={[1, 2, 3, 4, 5, 6, 7]}
                contentContainerStyle={{ gap: 20, padding: 20, backgroundColor: "#29A887" }}
                renderItem={({ item }) => {
                    return <CardTask />;
                }}
                keyExtractor={(item, idx) => idx}
            />
        </>
    );
};
