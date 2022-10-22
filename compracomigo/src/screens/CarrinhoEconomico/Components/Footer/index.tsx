import { BottomSheetModal } from "@gorhom/bottom-sheet";
import {
  Alert,
  Flex,
  Heading,
  HStack,
  Input,
  Text,
  useToast,
  VStack,
} from "native-base";
import { useCallback, useMemo, useRef, useState } from "react";
import { View } from "react-native";
import { DismissKeyboard } from "../../../../../App";
import MainButton from "../../../../components/MainButton";
import { useCarrinhoStore } from "../../../../storage/carrinho";
import { useOrcamentoStore } from "../../../../storage/orcamento";
import { globalStyles } from "../../../../styles/globalStyles";

// import { Container } from './styles';

type FooterProps = {
  toEndScreen: () => void;
};

const Footer: React.FC<FooterProps> = ({ toEndScreen }) => {
  const { orcamento, setOrcamento, setOriginalOrcamento } = useOrcamentoStore(
    (state) => state
  );
  const { carrinho } = useCarrinhoStore((state) => state);

  return (
    <Flex
      bgColor={globalStyles.primaryColor}
      borderTopRadius={30}
      p={4}
      marginTop={6}
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
        <MainButton text={"Finalizar"} onPress={() => toEndScreen()} />
      </Flex>
    </Flex>
  );
};

export default Footer;
