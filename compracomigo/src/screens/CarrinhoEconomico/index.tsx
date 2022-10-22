import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Flex, Spinner } from "native-base";
import { View } from "react-native";
import { DismissKeyboard } from "../../../App";
import { RootParamList } from "../../routes/app.routes";
import { useCarrinhoStore } from "../../storage/carrinho";
import { useCarrinhoEconomicoStore } from "../../storage/carrinhoEconomico";
import Body from "./Components/Body";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import { styles } from "./styles";

// import { Container } from './styles';

type HomeProps = {
  navigation: NativeStackNavigationProp<RootParamList, "home">;
};

const CarrinhoEconomico: React.FC<HomeProps> = ({ navigation }: HomeProps) => {
  const { setCarrinhoEconomico, setLoading, loading } =
    useCarrinhoEconomicoStore((state) => state);
  const { carrinho } = useCarrinhoStore((state) => state);

  function navigateToFinal() {
    navigation.navigate("final");
  }

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        {
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
            <Footer toEndScreen={navigateToFinal} />
          </>
        }
      </View>
    </DismissKeyboard>
  );
};

export default CarrinhoEconomico;
