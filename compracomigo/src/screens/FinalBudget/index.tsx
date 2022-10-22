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
import { api } from "../../services/api";
import { useCarrinhoEconomicoStore } from "../../storage/carrinhoEconomico";
// import { Container } from './styles';

type FinalProps = {
  navigation: NativeStackNavigationProp<RootParamList, "finalBudget">;
};

const FinalBudget: React.FC<FinalProps> = ({ navigation }: FinalProps) => {
  const { carrinho, clearCarrinho } = useCarrinhoStore((state) => state);
  const { clearOrcamento, originalOrcamento, orcamento } = useOrcamentoStore(
    (state) => state
  );
  const { carrinhoEconomico } = useCarrinhoEconomicoStore((state) => state);

  function handleNavigateToCarrinhoEconomico() {
    navigation.navigate("carrinhoEconomico");
  }

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
        <Text
          mt={1}
          fontSize="md"
          color={globalStyles.secondaryTextColor}
          fontWeight={600}
        >
          Seu orçamento foi de: R${" "}
          {originalOrcamento &&
            originalOrcamento.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}
        </Text>

        {originalOrcamento && carrinho.valorTotal < originalOrcamento ? (
          <Flex align="center">
            <Heading
              mt={6}
              size="2xl"
              mb={3}
              color={globalStyles.mainTextColor}
            >
              Parabéns!
            </Heading>
            <Flex
              align="center"
              bgColor="white"
              w={300}
              p={2}
              borderRadius="full"
            >
              <Text
                fontSize="lg"
                fontWeight={600}
                margin={0}
                padding={0}
                color={globalStyles.secondaryColor}
              >
                Você economizou
              </Text>
              <Text
                margin={0}
                padding={0}
                fontSize="3xl"
                fontWeight="bold"
                color={globalStyles.secondaryColor}
              >
                R${" "}
                {orcamento &&
                  orcamento.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
              </Text>
            </Flex>
          </Flex>
        ) : originalOrcamento && carrinho.valorTotal > originalOrcamento ? (
          <Flex align="center">
            <Heading
              mt={6}
              size="2xl"
              mb={3}
              color={globalStyles.mainTextColor}
            >
              Oops!
            </Heading>
            <Flex
              align="center"
              bgColor="white"
              w={300}
              p={2}
              borderRadius="full"
            >
              <Text
                fontSize="lg"
                fontWeight={600}
                margin={0}
                padding={0}
                color={globalStyles.secondaryColor}
              >
                Você gastou
              </Text>
              <Text
                margin={0}
                padding={0}
                fontSize="3xl"
                fontWeight="bold"
                color={globalStyles.secondaryColor}
              >
                R${" "}
                {orcamento &&
                  (orcamento * -1).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
              </Text>
              <Text
                fontSize="lg"
                fontWeight={600}
                margin={0}
                padding={0}
                color={globalStyles.secondaryColor}
              >
                acima do orçamento
              </Text>
            </Flex>
          </Flex>
        ) : (
          <Flex align="center">
            <Heading
              mt={6}
              size="2xl"
              mb={3}
              color={globalStyles.mainTextColor}
            >
              Que massa!
            </Heading>
            <Flex
              align="center"
              bgColor="white"
              w={300}
              p={2}
              borderRadius="full"
            >
              <Text
                fontSize="lg"
                fontWeight={600}
                margin={0}
                padding={0}
                color={globalStyles.secondaryColor}
              >
                Você se organizou bem
              </Text>
              <Text
                fontSize="lg"
                fontWeight={600}
                margin={0}
                padding={0}
                color={globalStyles.secondaryColor}
                textAlign="center"
              >
                e gastou o valor exato do orçamento!
              </Text>
            </Flex>
          </Flex>
        )}
      </Flex>
      <Flex
        bgColor="#80664E"
        width="100%"
        height="50%"
        borderTopRadius={50}
        align="center"
        pt={6}
      >
        <Flex align="center">
          <Heading size="2xl" mb={6} color={globalStyles.mainTextColor}>
            Ei olha só!
          </Heading>
          <Heading
            size="md"
            color={globalStyles.mainTextColor}
            textAlign="center"
          >
            Você pode economizar
          </Heading>
          <Text
            margin={0}
            padding={0}
            fontSize="3xl"
            fontWeight="bold"
            color={globalStyles.primaryColor}
          >
            R${" "}
            {carrinhoEconomico &&
              carrinhoEconomico.valorTotalEconomia.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
          </Text>
          <Heading
            size="md"
            mb={10}
            color={globalStyles.mainTextColor}
            textAlign="center"
          >
            trocando alguns itens!
          </Heading>
          <MainButton
            text="Opa quero ver!"
            width={300}
            fontSize={20}
            colorScheme="secondary"
            onPress={() => handleNavigateToCarrinhoEconomico()}
          />
          <MainButton
            text="Fica pra próxima!"
            width={300}
            fontSize={20}
            colorScheme="primary"
            onPress={() => {
              clearCarrinho();
              clearOrcamento();
              navigation.navigate("home");
            }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default FinalBudget;
