import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Flex, Spinner } from "native-base";
import { View } from "react-native";
import { DismissKeyboard } from "../../../App";
import { RootParamList } from "../../routes/app.routes";
import { api } from "../../services/api";
import { useCarrinhoStore } from "../../storage/carrinho";
import { useCarrinhoEconomicoStore } from "../../storage/carrinhoEconomico";
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
  const { setCarrinhoEconomico, setLoading, loading } =
    useCarrinhoEconomicoStore((state) => state);
  const { carrinho } = useCarrinhoStore((state) => state);
  const { orcamento,originalOrcamento } = useOrcamentoStore((state) => state);
  function navigateToFinal() {
    navigation.navigate("final");
  }

  async function navigateToBudgetFinal() {
    await handleGetOpcoesCarrinhoEconomico();
    navigation.navigate("finalBudget");
  }

  async function handleGetOpcoesCarrinhoEconomico() {
    try {
      setLoading(true);
      const { data } = await api.post("/produtos/carrinho-economico", {
        carrinho,
        originalOrcamento,
      });
      setCarrinhoEconomico(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        {hasPermission ? (
          <BarcodeScan />
        ) : (
          <>
            {loading ? (
              <Flex
                zIndex={100}
                bgColor="black"
                opacity={0.3}
                position="absolute"
                w="100%"
                h="100%"
                justify="center"
              >
                <Spinner color="white" />
              </Flex>
            ) : (
              ""
            )}
            <Header />
            <Body />
            <Footer
              toEndScreen={navigateToFinal}
              toBudgetEndScreen={navigateToBudgetFinal}
            />
          </>
        )}
      </View>
    </DismissKeyboard>
  );
};

export default Home;
