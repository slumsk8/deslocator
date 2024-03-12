import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Buttons({ title, destination, values}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.content}
      onPress={() => {        
        navigation.navigate(destination, values);
      }}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  content: {
    width: "60%",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    borderRadius: 5,
    elevation: 5,
  },
  text: {
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 18,
  },
});
