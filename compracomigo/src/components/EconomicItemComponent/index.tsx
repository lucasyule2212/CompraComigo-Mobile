import {
  Flex,
  Box,
  Heading,
  Image,
  Button,
  IconButton,
  Icon,
  Spinner,
} from "native-base";
import React, { useCallback } from "react";
import { itemCarrinho, useCarrinhoStore } from "../../storage/carrinho";
import starOff from "./assets/starOff.png";
import starOn from "./assets/starOn.png";
import { globalStyles } from "../../styles/globalStyles";
import ItemQtdButton from "../ItemQtdButton";
import MainButton from "../MainButton";
import { AntDesign } from "@expo/vector-icons";
import { api } from "../../services/api";
import { useSugestaoModalStore } from "../../storage/sugestaoModal";
// import { Container } from './styles';
import { ItemCarrinhoEconomico } from "../../storage/carrinhoEconomico";

type ItemComponentProps = {
  item: ItemCarrinhoEconomico;
};

const EconomicItemComponent: React.FC<ItemComponentProps> = ({
  item,
}: ItemComponentProps) => {
  const {
    priorizarItem,
    setSuggestedItems,
    setToChangeCarrinhoItemID,
    priorizarFirstTime,
    setPriorizarFirstTime,
    setPriorizarModalVisible,
  } = useCarrinhoStore((state) => state);

  const { setVisible, loading, setLoading } = useSugestaoModalStore(
    (state) => state
  );

  async function handleSugestItems() {
    try {
      setVisible(true);
      setToChangeCarrinhoItemID(item.id);
      setSuggestedItems(item.opcoes);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Flex
      mb={4}
      rounded="sm"
      padding={6}
      backgroundColor="white"
      width="100%"
      direction="row"
      alignItems="center"
    >
      <Box width={20} height={20}>
        <Image
          height={20}
          width={20}
          src={item.image}
          alt={item.nome}
          rounded="sm"
          onLoad={() => <Spinner color="muted.500" />}
        />
      </Box>
      <Flex direction="column" width="100%" ml={4}>
        <Flex width="100%" direction="row" justifyContent="space-between">
          <Heading
            color={globalStyles.secondaryTextColor}
            maxW={270}
            isTruncated
          >
            {item.nome}
          </Heading>
        </Flex>
        <Flex
          width="70%"
          direction="row"
          justifyContent="space-between"
          mt={4}
          alignItems="start"
        >
          <MainButton
            text="Ver Opções"
            colorScheme="secondary"
            width={32}
            onPress={handleSugestItems}
            fontSize="xs"
          />
          <ItemQtdButton
            qtd={item.quantidade}
            item={item}
            displayQtdButtons={false}
          />
        </Flex>
        <Flex
          width="70%"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading fontSize="md" color={globalStyles.secondaryColor}>
            Atual:
          </Heading>
          <Heading fontSize="md" color={globalStyles.secondaryColor}>
            R$
            {item.preco.toLocaleString("pt-br", {
              minimumFractionDigits: 2,
            })}
            /uni.
          </Heading>
          <Heading fontSize="xl" color={globalStyles.secondaryColor}>
            R$
            {item.valorTotal.toLocaleString("pt-br", {
              minimumFractionDigits: 2,
            })}
          </Heading>
        </Flex>
        <Flex
          width="70%"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          
        >
          {item.opcoes.length && item.opcoes.length > 0 ? (
            <>
              <Heading fontSize="sm" color={globalStyles.primaryColor}>
                +Barato:
              </Heading>
              <Heading fontSize="sm" color={globalStyles.primaryColor}>
                R$
                {item.opcoes[0].valor.toLocaleString("pt-br", {
                  minimumFractionDigits: 2,
                })}
                /uni.
              </Heading>
              <Heading fontSize="md" color={globalStyles.primaryColor}>
                R$
                {(item.opcoes[0].valor * item.quantidade).toLocaleString(
                  "pt-br",
                  {
                    minimumFractionDigits: 2,
                  }
                )}
              </Heading>
            </>
          ) : (
            <Heading fontSize="md" color={globalStyles.primaryColor}>
              É o mais barato!
            </Heading>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default EconomicItemComponent;
