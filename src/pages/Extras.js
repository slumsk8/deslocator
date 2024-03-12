import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import carro from "../../assets/carro.png";

export default function Extras() {
  const route = useRoute();
  const { valor, valorExtra, valorInicial, minExtraV, secExtra } = route.params;
  const navigation = useNavigation();
  let msg = "Programa resetado";

  function restart() {
    navigation.navigate("header", msg);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView scrollEnabled={true}>
        <View style={styles.content}>
          <View style={styles.barra}>
            <Text style={styles.textBarra}>Obrigado por viajar comigo!</Text>
          </View>
          <View style={styles.image}>
            <Image source={carro} style={styles.img} />
          </View>
          <View style={styles.content}>
            <Text style={styles.titleText}>Resumo da viagem</Text>
            <View style={styles.viewContent}>
              <Text style={styles.textTempo}>
                Tempo extra: {minExtraV} min : {secExtra} seg
              </Text>
            </View>
            <View style={styles.viewContent}>
              <Text style={styles.textTempo}>
                Valor da viagem: R$ {parseFloat(valorInicial).toFixed(2)}
              </Text>
            </View>
            <View style={styles.viewContent}>
              <Text style={styles.textTempo}>
                Valor extra: R$ {parseFloat(valorExtra.toFixed(2))}
              </Text>
            </View>
            <View style={styles.viewContent}>
              <Text style={styles.textTempo}>
                Total: R$ {parseFloat(valor).toFixed(2)}
              </Text>
            </View>
          </View>
          <View style={styles.botaoSair}>
            <TouchableOpacity onPress={restart}>
              <Text style={styles.textBotao}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c7c8cb",
    alignItems: "center",        
  },
  content: {
    marginTop: 10,    
    paddingBottom: 40,
    alignItems: "center",
  },
  barra: {
    elevation: 5,
    borderRadius: 15,
    width: "90%",
    height: 100,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  textBarra: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    textTransform: "uppercase",
    letterSpacing: 5,
  },
  image: {
    width: "100%",
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 250,
    height: 250,
  },
  // content: {
  //   width: "80%",
  //   height: 500,
  //   padding: 10,
  // },
  titleText: {
    fontSize: 24,
    textTransform: "uppercase",
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 5,
  },
  viewContent: {
    width: "100%",
    height: 40,    
    alignItems: "center",
    flexDirection: "row",
  },
  textTempo: {
    fontSize: 20,
    width: "100%",
    textAlign: "center",
    color: "#000",
  },
  botaoSair: {
    width: "40%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#c7541e",
    borderRadius: 15,
  },
  textBotao: {
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 5,
    color: "#fff",
    textTransform: "uppercase",
  },
});
