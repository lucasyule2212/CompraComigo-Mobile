import {
  Flex,
  Text,
  Heading,
  Box,
  Spacer,
  Button,
  Input,
  useToast,
  Alert,
  VStack,
  HStack,
} from "native-base";
import { View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { globalStyles } from "../../../../styles/globalStyles";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useCallback, useRef, useMemo, useState } from "react";
import { Props } from "framer-motion/types/types";
import MainButton from "../../../../components/MainButton";
import { useOrcamentoStore } from "../../../../storage/orcamento";
import { api } from "../../../../services/api";
import apiRoutes from "../../../../utils/apiRoutes";
import { useCarrinhoStore } from "../../../../storage/carrinho";
import { DismissKeyboard } from "../../../../../App";

// import { Container } from './styles';

type FooterProps = {
  toEndScreen: () => void;
};

const Footer: React.FC<FooterProps> = ({ toEndScreen }) => {
  const { orcamento, setOrcamento, setOriginalOrcamento } = useOrcamentoStore(
    (state) => state
  );
  const { carrinho } = useCarrinhoStore((state) => state);

  const [orcamentoValue, setOrcamentoValue] = useState<string | null>(null);

  const toast = useToast();

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["35%", "55%"], []);
  const handleOpenSheet = useCallback(
    () => bottomSheetRef.current?.present(1),
    []
  );
  const handleCloseSheet = useCallback(
    () => bottomSheetRef.current?.dismiss(),
    []
  );

  const handleSetOrcamento = async (orcamento: string) => {
    try {
      const parsedOrcamento = Number(orcamento) - carrinho.valorTotal;
      setOrcamento(parsedOrcamento);
      setOriginalOrcamento(Number(orcamento));
      handleCloseSheet();
      // await api.post(apiRoutes.setOrcamento(parsedOrcamento));
    } catch (error) {
      console.log(error);
    }
  };
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  return (
    <Flex
      direction="column"
      align="start"
      bgColor={globalStyles.primaryColor}
      justify="center"
      borderTopRadius={30}
      p={4}
      marginTop={6}
      paddingTop={6}
      flex={1}
    >
      <Flex justifyContent="space-between" direction="row" width="100%">
        <Flex direction="row">
          <Heading fontSize="3xl" color={globalStyles.mainTextColor} mr={2}>
            Total:
          </Heading>
          <Heading fontSize="3xl" color={globalStyles.mainTextColor}>
            R${" "}
            {carrinho.valorTotal.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}
          </Heading>
        </Flex>
        <MainButton
          text={"Finalizar"}
          onPress={() => {
            toEndScreen();
          }}
        />
      </Flex>

      <Flex mt={1} direction="row" align="center" width="100%">
        {orcamento ? (
          <>
            <Heading
              fontSize="sm"
              color={globalStyles.secondaryTextColor}
              mr={2}
            >
              Orçamento restante:
            </Heading>
            <Heading fontSize="md" color={globalStyles.secondaryTextColor}>
              R${" "}
              {orcamento.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </Heading>
          </>
        ) : (
          <MainButton text={"Adicionar orçamento"} onPress={handleOpenSheet} />
        )}

        {/*  */}
        <BottomSheetModal
          ref={bottomSheetRef}
          index={isKeyboardOpen ? 1 : 0}
          snapPoints={snapPoints}
          backgroundComponent={({ style }) => (
            <View style={[style, { backgroundColor: "none" }]} />
          )}
        >
          <DismissKeyboard>
            <View
              style={{
                backgroundColor: globalStyles.primaryColor,
                height: "100%",
                borderTopRightRadius: 50,
                borderTopLeftRadius: 50,
                padding: 25,
              }}
            >
              <Heading color={globalStyles.mainTextColor}>
                Defina um orçamento:
              </Heading>
              <Flex direction="row" mt={5} width="100%">
                <Heading color={globalStyles.mainTextColor} opacity={50}>
                  R${" "}
                </Heading>
                <Input
                  borderColor="transparent"
                  borderBottomColor="white"
                  borderBottomWidth={3}
                  size="2xl"
                  placeholder="500"
                  placeholderTextColor="rgba(255, 255, 255, 0.452)"
                  width="80%"
                  fontWeight="bold"
                  keyboardType="numeric"
                  color={globalStyles.mainTextColor}
                  padding={0}
                  _focus={{ borderColor: "transparent" }}
                  onFocus={() => setIsKeyboardOpen(true)}
                  onBlur={() => setIsKeyboardOpen(false)}
                  onChangeText={(text) => setOrcamentoValue(text)}
                />
              </Flex>
              <Flex alignItems={"flex-end"} marginTop={4} width="90%">
                <MainButton
                  width={40}
                  text="Definir"
                  onPress={() => {
                    if (orcamentoValue) {
                      handleSetOrcamento(orcamentoValue);
                    } else {
                      toast.show({
                        title: "Oops!",
                        description: "Você precisa definir um valor primeiro",
                        variant: "subtle",
                        placement: "bottom",
                        render: () => {
                          return (
                            <Alert status="warning" colorScheme="warning">
                              <VStack space={2} flexShrink={1} w="100%">
                                <HStack
                                  flexShrink={1}
                                  space={2}
                                  alignItems="center"
                                  justifyContent="space-between"
                                >
                                  <HStack
                                    space={2}
                                    flexShrink={1}
                                    alignItems="center"
                                  >
                                    <Alert.Icon />
                                    <Text color={"black"}>
                                      Oops! Você precisa definir um valor
                                      primeiro 😉!
                                    </Text>
                                  </HStack>
                                </HStack>
                              </VStack>
                            </Alert>
                          );
                        },
                      });
                    }
                  }}
                />
              </Flex>
            </View>
          </DismissKeyboard>
        </BottomSheetModal>
      </Flex>
    </Flex>
  );
};

export default Footer;
