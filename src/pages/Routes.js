import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./Home";
import Orcamento from "./Orcamento";
import Extras from "./Extras";


const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="header"
          component={Home}          
          options={{
            headerTintColor: "#fff",
            title: 'CALCULE A VIAGEM',
            headerTitleAlign: "center",            
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 24,                         
            },            
            headerStyle: {
              backgroundColor: "#000",              
            },
          }}
        />      
        <Stack.Screen
          name="orcamento"
          component={Orcamento}
          options={{
            title: "ORÇAMENTO",
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 24,
            },
            headerStyle: {
              backgroundColor: "#000",
            },
          }}
        />
        <Stack.Screen
          name="extra"
          component={Extras}
          options={{
            title: "RESUMO",
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 24,
            },
            headerStyle: {
              backgroundColor: "#000",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
