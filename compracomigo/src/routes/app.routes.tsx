import React from "react";

// import { Container } from './styles';

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Final from "../screens/Final";

const { Navigator, Screen } = createNativeStackNavigator();
export type RootParamList = {
  home: undefined;
  final: undefined;
};

const AppRoutes: React.FC = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="final" component={Final} />
    </Navigator>
  );
};

export default AppRoutes;
