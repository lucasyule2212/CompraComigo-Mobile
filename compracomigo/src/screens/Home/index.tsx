import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View } from "react-native";
import { DismissKeyboard } from "../../../App";
import { RootParamList } from "../../routes/app.routes";
import { useCarrinhoStore } from "../../storage/carrinho";
import { useLeitorBarraStore } from "../../storage/leitorBarra";
import { useOrcamentoStore } from "../../storage/orcamento";
import BarcodeScan from "./Components/BarcodeScan";
import Body from "./Components/Body";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import { styles } from "./styles";

// import { Container } from './styles';

type HomeProps = {
  navigation: NativeStackNavigationProp<RootParamList, "home">;
};

const Home: React.FC<HomeProps> = ({ navigation }: HomeProps) => {
  const { hasPermission, codigoDeBarras, setScanned } = useLeitorBarraStore(
    (state) => state
  );

  function navigateToFinal() {
    navigation.navigate("final");
  }

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        {hasPermission ? (
          <BarcodeScan />
        ) : (
          <>
            <Header />
            <Body />
            <Footer toEndScreen={navigateToFinal} />
          </>
        )}
      </View>
    </DismissKeyboard>
  );
};

export default Home;
