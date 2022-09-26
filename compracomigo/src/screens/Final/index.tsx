import { Box, Button, Flex, Heading, Image, Text } from "native-base";
import React from "react";
import { useCarrinhoStore } from "../../storage/carrinho";
import { globalStyles } from "../../styles/globalStyles";
import icon from "../../../assets/icon.png";
import nomeLogo from "../../../assets/nome-logo.png";
import MainButton from "../../components/MainButton";
import { useOrcamentoStore } from "../../storage/orcamento";
import { RootParamList } from "../../routes/app.routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { Container } from './styles';

type FinalProps = {
  navigation: NativeStackNavigationProp<RootParamList, "final">;
};

const Final: React.FC<FinalProps> = ({ navigation }: FinalProps) => {
  const { carrinho, clearCarrinho } = useCarrinhoStore((state) => state);
  const { clearOrcamento } = useOrcamentoStore((state) => state);
  return (
    <Flex
      flex={1}
      alignItems="center"
      justify="space-between"
      bgColor={globalStyles.primaryColor}
    >
      <Flex align="center" mt={20}>
        <Heading size="2xl" mb={2} color={globalStyles.mainTextColor}>
          Total Gasto:
        </Heading>
        <Flex align="center" bgColor="white" w={200} p={2} borderRadius="full">
          <Heading size="xl" color={globalStyles.secondaryTextColor}>
            R${" "}
            {carrinho.valorTotal.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}
          </Heading>
        </Flex>
      </Flex>
      <Flex
        bgColor="#80664E"
        width="100%"
        height="60%"
        borderRadius="50% 50% 0% 0% / 26% 26% 0% 0% "
        justify="space-around"
      >
        <Flex align="center">
          <Heading size="2xl" mb={4} color={globalStyles.mainTextColor}>
            Volte sempre!
          </Heading>
          <MainButton
            text="Concluir"
            width={200}
            fontSize={20}
            colorScheme="secondary"
            onPress={() => {
              clearCarrinho();
              clearOrcamento();
              navigation.navigate("home");
            }}
          />
        </Flex>
        <Flex>
          <Image
            ml="auto"
            mr="auto"
            height={100}
            width={100}
            source={icon}
            alt="Imagem seta"
          />
          <Image ml="auto" mr="auto" source={nomeLogo} alt="Nome logo" />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Final;
