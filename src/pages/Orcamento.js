import { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import viagem from "../../assets/viagem.gif";

export default function Orcamento() {
  //PARAMETROS RECEBIDOS PELA ROTA
  const route = useRoute();
  let { fipeAno, kmAno, kmL, ipvaAno, manutAno, data, distancia, tempo, valorComb } =
    route.params;
         
  //CALCULANDO OS CUSTOS
  // Total gasto com gasolina dentro do percurso informado
  const totalGas = parseFloat((distancia / kmL) * valorComb);
  let valorKm = 0;

  //Calculando o valor por km rodado
  if (distancia <= 20) {
    valorKm = 1.50
  }
  if (distancia > 20) {
    valorKm = 1;
  }  

  const kmDia = parseFloat(
    fipeAno == 0 || ipvaAno == 0 ? 0 : (fipeAno - (fipeAno * 0.187)) / kmAno
  );
 
  const hoje = new Date()
  const dataViagem = new Date(hoje.getFullYear(),11,data.split('/')[2])    
  const dia = 1000 * 60 * 60 * 24    
  const numDiasAno = Math.ceil((dataViagem.getTime() - hoje.getTime())/dia)

  
  // const ipvaDia = parseFloat(ipvaAno === 0 ? 0 : ipvaAno / 365);
  const ipvaDia = ipvaAno/numDiasAno
  const manutDia = manutAno / numDiasAno;
  const gastos = parseFloat(ipvaDia + manutDia);
  const total = parseFloat((valorKm * distancia) + gastos);
  let percent = parseFloat(total) + (total * 0.2);
  console.log({
    'KM Diário' : kmDia.toFixed(2),
    'IPVA Diário' : ipvaDia.toFixed(2),
    'MANUTENÇÃO Diário': manutDia.toFixed(2),    
    'TOTAL Combustível': totalGas.toFixed(2),
    'OUTROS Gastos': gastos.toFixed(2),
    'VALOR KM': valorKm.toFixed(2),
    'TOTAL Geral': total.toFixed(2),
    'VALOR à Receber': percent.toFixed(2)
  })

  //VARIAVEIS PARA OS CALCULOS DOS TEMPOS DE VIAGEM
  let tempoViagem = parseInt(tempo); //aqui recebo os minutos estimados da viagem
  let [minViagem, setMinViagem] = useState(tempoViagem); //estado parar armazenar o tempo inicial
  let segundos = 60; // variável que me mostra os segundos no tempo de viagem
  let [secViagem, setSecViagem] = useState(60); //estado para armazenar os segundos do tempo de viagem

  //VARIAVEIS PARA CALCULO DO TEMPO EXTRA
  let minExtra = 0;
  let [minExtraV, setMinExtraV] = useState(0); //estado para armazenar os minutos do tempo extra total
  let segundosExtra = 0; //variável que mostra os segundos no tempo extra
  let [secExtra, setSecExtra] = useState(0); //estado para armazenar o decremento dos segundos

  //VARIAVEIS PARA CALCULO DO VALOR TOTAL DA VIAGEM (INCLUINDO TEMPO EXTRA)
  let valorInicial = percent; //valor inicial da corrida, sem extras
  let [valor, setValor] = useState(valorInicial); //estado para armazenar o valor inicial da corrida
  let acrescimo = 0.35; //variável para guardar o valor de acrescimo por minuto
  let somaAcrescimo = 0;
  let [valorExtra, setValorExtra] = useState(0); //estado para armazenar valor extra

  //FUNCOES PARA SINCRONISMO DO TEMPO DE VIAGEM
  function decrementarMinutosTempoViagem() {
    tempoViagem -= 1;
    setMinViagem(tempoViagem);
  }
  function decrementarSegundosTempoViagem() {
    segundos--;
    if (segundos == 0) {
      segundos = 60;
      setSecViagem(segundos);
    }
    setSecViagem(segundos);
  }

  //FUNCAO QUE STARTA A VIAGEM
  const [start, setStart] = useState(0);
  function iniciarViagem() {
    setStart(1);
    //CONDICAO PARA SINCRONIZAR OS SEGUNDOS DENTRO DE TEMPO DE VIAGEM
    if (segundos == 60) {
      tempoViagem -= 1;
      setMinViagem(tempoViagem);
    }
    //SetInterval para decrementar o tempo de viagem
    const decrementoID = setInterval(decrementarMinutosTempoViagem, 60000);
    setTimeout(function () {
      setMinViagem(0);
      clearInterval(decrementoID);
    }, parseInt(tempo) * 60000);
    //SetInterval para decrementar os segundos no tempo de viagem
    const decrementarSegundosTempoViagemID = setInterval(
      decrementarSegundosTempoViagem,
      1000
    );
    //Funcao para encerrar o tempo
    setTimeout(function () {
      setSecViagem(0);
      clearInterval(decrementarSegundosTempoViagemID);
      setMostraFinalizar(1);
      setMostraExtra(1);
    }, parseInt(tempo) * 60000);
  }

  //FUNCAO PARA INCREMENTO DO TEMPO EXTRA
  function incSecExtra() {
    segundosExtra++;
    setSecExtra(segundosExtra);
    if (segundosExtra == 60) {
      segundosExtra = 0;
      minExtra++;
      setMinExtraV(minExtra);
      valorInicial += acrescimo;
      somaAcrescimo += 0.25;
      setValorExtra(somaAcrescimo);
      setValor(valorInicial);
    }
  }

  //FUNCAO QUE INICIA A CONTAGEM DO TEMPO EXTRA
  let incSecExtraID;
  let [idSec, setIdSec] = useState();
  function tempoExtraID() {
    incSecExtraID = setInterval(incSecExtra, 1000); //aqui era 1000
    setIdSec(incSecExtraID);
    setMostraExtra(0);
  }

  //FUNCAO PARA ENCERRAR A CONTAGEM DE TEMPOEXTRA
  const navigation = useNavigation();
  function finalizarViagem() {
    setMostraFinalizar(0);
    setMostraTotal(1);
    clearInterval(idSec);
  }

  //TELA DE ORCAMENTO
  //ESTADO PARA MOSTRAR O BOTAO TEMPO EXTRA NA TELA DE ORCAMENTO
  let [mostraExtra, setMostraExtra] = useState(0);
  //ESTADO PARA MOSTRAR O BOTAO FINALIZAR NA TELA DE ORCAMENTO
  let [mostraFinalizar, setMostraFinalizar] = useState(0);
  //ESTADO PARA MOSTRAR O BOTAO VER TOTAL NA TELA DE ORCAMENTO
  let [mostraTotal, setMostraTotal] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.viagemImg}>
            <Image source={viagem} style={{ width: 250, height: 250 }} />
          </View>
          <View style={styles.tempoContainer}>
            {start == 0 ? (
              <Text style={styles.tempo}>Tempo estimado : 0 min : 0 seg</Text>
            ) : (
              <Text style={styles.tempo}>
                Tempo estimado: {minViagem} min : {secViagem} seg
              </Text>
            )}
          </View>
          <View style={styles.tempoExtraContainer}>
            <Text style={styles.tempoExtraTitle}>Extra</Text>
            <Text style={styles.textExtra}>
              {minExtraV} minutos e {secExtra} segundos
            </Text>
            <Text style={styles.textExtra}>
              Valor extra: R$ {valorExtra.toFixed(2)}{" "}
            </Text>
          </View>
          <Text style={styles.pagarExtra}>Total a pagar</Text>
          <View style={styles.totalPagar}>
            <Text style={styles.total}>R$ {valor.toFixed(2)}</Text>
          </View>
          <View style={styles.btnControlContent}>
            {/* BOTAO PARA INICIAR VIAGEM */}
            {start == 0 ? (
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <TouchableOpacity
                  style={styles.botaoTotal}
                  onPress={iniciarViagem}
                >
                  <Text style={styles.textBtns}>Iniciar Viagem</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.botaoTotal}
                  onPress={() => {
                    navigation.navigate("header");
                  }}
                >
                  <Text style={styles.textBtns}>Cancelar Viagem</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity style={styles.botaoTotalV}></TouchableOpacity>
            )}

            {/* BOTAO PARA INICIAR TEMPOEXTRA */}
            {mostraExtra == 1 ? (
              <TouchableOpacity
                style={styles.botaoTotal}
                onPress={() => {
                  tempoExtraID();
                }}
              >
                <Text style={styles.textBtns}>Iniciar extra</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.botaoTotalV}></TouchableOpacity>
            )}

            {/* BOTAO PARA FINALIZAR A VIAGEM E TIRAR O PRINT DA TELA */}
            {mostraFinalizar == 0 ? (
              <TouchableOpacity style={styles.botaoTotalV}></TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.botaoTotal}
                onPress={finalizarViagem}
              >
                <Text style={styles.textBtns}>Finalizar</Text>
              </TouchableOpacity>
            )}

            {/* BOTAO PARA VER O TOTAL */}
            {mostraTotal == 1 ? (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("extra", {
                    valor,
                    valorExtra,
                    valorInicial,
                    minExtraV,
                    secExtra,
                  })
                }
                style={styles.botaoTotal}
              >
                <Text style={styles.textBtns}>Ver total</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.botaoTotalV}></TouchableOpacity>
            )}
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
    alignItems: "center",
  },
  viagemImg: {
    width: "50%",
    alignItems: "center",
    marginTop: 20,
  },
  tempoContainer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40,
  },
  tempo: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
    letterSpacing: 2,
  },
  tempoExtraContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  tempoExtraTitle: {
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 18,
    color: "#000",
    letterSpacing: 2,
  },
  textExtra: {
    fontSize: 18,
    color: "#000",
    letterSpacing: 2,
  },
  pagarExtra: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  totalPagar: {
    width: 400,
    borderColor: "#000",
    borderWidth: 5,
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  total: {
    fontSize: 56,
    textTransform: "uppercase",
    color: "#000",
    fontWeight: "bold",
  },
  btnControlContent: {
    width: "90%",
    alignItems: "center",
    marginTop: 10,
  },
  botaoTotal: {
    width: "50%",
    height: 50,
    backgroundColor: "#000",
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    borderRadius: 5,
  },
  botaoTotalV: {
    display: "none",
  },
  barra: {
    width: "50%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    borderRadius: 5,
    elevation: 5,
  },
  textBtns: {
    color: "#fff",
    textTransform: "uppercase",
  },
  title: {
    alignItems: "center",
  },
  text: {
    color: "#000",
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 14,
  },
});
