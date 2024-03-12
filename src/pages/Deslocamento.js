import { StyleSheet, View } from "react-native";
import Percurso from "../components/Percurso";
import Consumo from "../components/Consumo";

import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import Buttons from "../components/Buttons";

export default function Deslocamento() {
  const route = useRoute();
  const { kmAno, kmL, ipvaAno, manutAno, fipeAno } = route.params;
  const [distancia, setDistancia] = useState();
  const [valorComb, setValorComb] = useState();
  const [tempo, setTempo] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.sobreDeslocamento}>
        <Percurso name="distância" measure="km" value={setDistancia} />
      </View>
      <View style={styles.sobreDeslocamento}>
        <Percurso name="tempo" measure="min" value={setTempo} />
      </View>
      <View style={styles.sobreDeslocamento}>
        <Consumo name="valor combustível" measure="R$" value={setValorComb} />
      </View>
      <Buttons
        title="Orçamento"
        destination="orcamento"
        values={{
          distancia,
          valorComb,
          tempo,
          kmAno,
          kmL,
          ipvaAno,
          manutAno,
          fipeAno, 
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    alignItems: "center",
    borderColor: "#6a4e99",
    backgroundColor: "#6a4e99",
  },
  sobreDeslocamento: {
    alignItems: "center",
    width: "100%",
    gap: 10,
    marginTop: 20,
  },
});
