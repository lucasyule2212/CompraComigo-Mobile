import {
  Flex,
  Box,
  Heading,
  Image,
  Button,
  IconButton,
  Icon,
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

type ItemComponentProps = {
  item: itemCarrinho;
};

const ItemComponent: React.FC<ItemComponentProps> = ({
  item,
}: ItemComponentProps) => {
  const { priorizarItem, setSuggestedItems, setToChangeCarrinhoItemID } =
    useCarrinhoStore((state) => state);
  const { setVisible } = useSugestaoModalStore((state) => state);
  const handlePriorizarItem = useCallback((item: itemCarrinho) => {
    priorizarItem(item);
  }, []);

  async function handleSugestItems() {
    try {
      const { data } = await api.get(`/produtos/sugestoes/${item.id}`);
      setToChangeCarrinhoItemID(item.id);
      setSuggestedItems(data);
      setVisible(true);
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
        />
      </Box>
      <Flex direction="column" width="100%" ml={4}>
        <Flex width="70%" direction="row" justifyContent="space-between">
          <Heading
            color={globalStyles.secondaryTextColor}
            maxW={200}
            isTruncated
          >
            {item.nome}
          </Heading>

          {/* DESENVOLVER BOTÃO DE PRIORIZAR ITEM */}
          <IconButton
            width={10}
            height={10}
            icon={<Icon as={AntDesign} name="star" />}
            rounded="full"
            _icon={{
              size: "xl",
              color: item.priorizado ? "yellow.400" : "gray.400",
            }}
            _pressed={{ bgColor: "transparent", _icon: { size: "2xl" } }}
            onPress={() => handlePriorizarItem(item)}
          />
        </Flex>
        <Flex
          width="70%"
          direction="row"
          justifyContent="space-between"
          mt={4}
          alignItems="start"
        >
          <MainButton
            text="Sugestões"
            colorScheme="secondary"
            width={20}
            onPress={handleSugestItems}
            fontSize="xs"
          />
          <ItemQtdButton qtd={item.quantidade} item={item} />
        </Flex>
        <Flex
          width="70%"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading fontSize="lg" color={globalStyles.secondaryColor}>
            R$
            {item.preco.toLocaleString("pt-br", {
              minimumFractionDigits: 2,
            })}
            /uni.
          </Heading>
          <Heading fontSize="2xl" color={globalStyles.secondaryColor}>
            R$
            {item.valorTotal.toLocaleString("pt-br", {
              minimumFractionDigits: 2,
            })}
          </Heading>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ItemComponent;
