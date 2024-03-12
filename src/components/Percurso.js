import { StyleSheet, Text, TextInput, View } from "react-native";

export default function Percurso({ name, measure, value = 0 }) {
  return (
    <View style={styles.content}>
      <TextInput
        style={styles.input}
        placeholder={name}
        onChangeText={value}
        returnKeyType="next"
        keyboardType="number-pad" 
      ></TextInput>
      <Text style={styles.text}>{measure}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    gap: 5,
    width: "70%",
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 60,
    backgroundColor: "#c7c8cb",
    borderBottomWidth: 1,
    fontSize: 18,
    padding: 5,
    textAlignVertical: "center",
  },
  text: {
    color: "#000",
    fontSize: 18,
  },
});
