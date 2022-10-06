import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { Routes } from "./src/routes";

export const DismissKeyboard = ({ children }: { children: JSX.Element }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default function App() {
  return (
    <NativeBaseProvider>
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <StatusBar style="auto" />
        </View>
        <Routes />
      </BottomSheetModalProvider>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9F9F9",
    marginTop: 50,
  },
});
