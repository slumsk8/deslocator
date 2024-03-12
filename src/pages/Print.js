import { Image, StyleSheet, Text, View } from "react-native";
import { useRoute } from '@react-navigation/native'

export default function Print() {
  const route = useRoute();
  let { imageURI, savedImagePath } = route.params;
  let image = imageURI
  console.log('image: ', image)

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.imgPrint}/>      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c7c8cb",    
  },
  imgPrint: {
    width: 500,    
    height: 500
  }
});
