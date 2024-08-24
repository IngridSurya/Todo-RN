import { Dimensions } from "react-native";

export default class Styles {
    static windowWidth = Dimensions.get("window").width;
    static windowHeight = Dimensions.get("window").height;

    static primaryColor = "#158c83";
    static btn_primaryColor = { backgroundColor: this.primaryColor };
    static Button_XL = {
        ...this.btn_primaryColor,
        width: "100%",
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        elevation: 4,
    };
    static TextInput_XL = {
        backgroundColor: "white",
        width: "100%",
        height: 40,
        padding: 10,
        borderRadius: 10,
    }
}
