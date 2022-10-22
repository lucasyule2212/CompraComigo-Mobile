import React from "react";

// import { Container } from './styles';

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Final from "../screens/Final";
import FinalBudget from "../screens/FinalBudget";
import CarrinhoEconomico from "../screens/CarrinhoEconomico";

const { Navigator, Screen } = createNativeStackNavigator();
export type RootParamList = {
  home: undefined;
  final: undefined;
  finalBudget: undefined;
  carrinhoEconomico: undefined;
};

const AppRoutes: React.FC = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="final" component={Final} />
      <Screen name="finalBudget" component={FinalBudget} />
      <Screen name='carrinhoEconomico' component={CarrinhoEconomico}/>
    </Navigator>
  );
};

export default AppRoutes;
