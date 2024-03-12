import {
  View,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  ScrollView,  
} from "react-native";
import { useState } from "react";
import Buttons from "../components/Buttons";
import Veiculo from "../components/Veiculo";
import doblo from "../../assets/doblo.png";
import rota from "../../assets/rota.png";
import Percurso from "../components/Percurso";
import Consumo from "../components/Consumo";
import DatePicker from "react-native-modern-datepicker";

export default function Home() {
  //VEICULO
  const [kmAno, setKmAno] = useState(0);
  const [kmL, setKmL] = useState(0);
  const [ipvaAno, setIpvaAno] = useState(0);
  const [data, setData] = useState();
  const [manutAno, setManutAno] = useState(0);
  const [fipeAno, setFipeAno] = useState(0);  
  
  //ROTEIRO
  const [distancia, setDistancia] = useState(0);
  const [valorComb, setValorComb] = useState(0);
  const [tempo, setTempo] = useState(0); 
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.sobreVeiculo}>
            {/* INFORMACOES SOBRE O VEICULO */}
            <Image style={styles.img} source={doblo} />
            <Text style={styles.textVeiculo}>Informações do veículo</Text>
            <Veiculo name="Valor FIPE do ano" measure="R$" value={setFipeAno} />
            <Veiculo
              name="Estimativa de km rodados por ano"
              measure="km"
              value={setKmAno}
            />
            <Veiculo name="Km/l" measure="km" value={setKmL} />
            <Veiculo name="Valor IPVA do ano" measure="R$" value={setIpvaAno} />
            <View style={styles.containerInput}>
              <Text style={styles.text}>Data Vigem</Text>
              <DatePicker 
                options={{
                  backgroundColor: '#fff',
                  textDefaultColor: '#000',                                                      
                }}
                onSelectedChange={value => setData(value)}                
                mode="calendar"                           
              />            
            </View>
            <Veiculo
              name="Gasto estimado com manutenção"
              measure="R$"
              value={setManutAno}
            />
          </View>
          {/* INFORMACOES SOBRE O ROTEIRO */}
          <View style={styles.sobreRoteiro}>
            <Image style={styles.img} source={rota} />
            <Text style={styles.textVeiculo}>Informações do roteiro</Text>
            <Percurso
              name="Distância da viagem"
              measure="km"
              value={setDistancia}
            />
            <Percurso
              name="Tempo estimado da viagem"
              measure="min"
              value={setTempo}
            />
            <Consumo
              name="Valor combustível do dia"
              measure="R$"
              value={setValorComb}
            />
          </View>
          <View style={{ alignItems: "center", marginTop: 40 }}>
            <Buttons
              title="Gerar orçamento"
              destination="orcamento"
              values={{
                fipeAno,
                kmAno,
                kmL,
                ipvaAno,
                data,
                manutAno,
                distancia,
                tempo,
                valorComb,
              }}
            />
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
  },
  content: {
    marginTop: 10,
    width: "100%",
    paddingBottom: 40,
  },
  img: {
    width: 150,
    height: 150,
    resizeMode: "center",
  },
  sobreVeiculo: {
    width: "100%",
    alignItems: "center",
    gap: 5,
    marginTop: 40,
  },
  sobreRoteiro: {
    width: "100%",
    alignItems: "center",
    gap: 5,
    marginTop: 40,
  },
  textVeiculo: {
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 18,
    color: "#000",
  },
  containerInput: {
    width: '70%',
    height: 400,
    gap: 5,
    flexDirection: "column",          
    alignItems: "center",   
    justifyContent: 'center' 
  },
  input: {
    width: "100%",
    height: 60,    
    backgroundColor: "#c7c8cb",    
    borderBottomWidth: 1,
    fontSize: 18,
    padding: 5,
    textAlignVertical: 'center'
  },
  text: {
    color: "#000",
    fontSize: 18
  },
});
