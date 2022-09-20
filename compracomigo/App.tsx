import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { useEffect } from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import uuid from "react-native-uuid";
import Home from "./src/screens/Home";
import { api } from "./src/services/api";
import { useSessionStore } from "./src/storage/session";
import setSession from "./src/utils/apiRoutes";

export default function App() {
  const setSessionId = useSessionStore((state) => state.setSessionId);
  useEffect(() => {
    const sessionId = uuid.v4().toString();
    api.defaults.headers.common["session-id"] = sessionId;
    async () => {
      try {
        await api.post(setSession.setSession(sessionId));
        setSessionId(sessionId);
      } catch (error) {
        console.log(error);
      }
    };
  }, []);

  const DismissKeyboard = ({ children }: { children: JSX.Element }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );

  return (
    <DismissKeyboard>
      <NativeBaseProvider>
        <BottomSheetModalProvider>
          <View style={styles.container}>
            <StatusBar style="auto" />
            <Home />
          </View>
        </BottomSheetModalProvider>
      </NativeBaseProvider>
    </DismissKeyboard>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9F9F9",
    marginTop: 50,
  },
});

