import { Button, Flex, Text, Heading } from "native-base";
import React, { useState } from "react";
import { itemCarrinho, useCarrinhoStore } from "../../storage/carrinho";
import { useOrcamentoStore } from "../../storage/orcamento";
import { globalStyles } from "../../styles/globalStyles";

// import { Container } from './styles';

type ItemQtdButtonProps = {
  qtd: number;
  item: itemCarrinho;
};

const ItemQtdButton: React.FC<ItemQtdButtonProps> = ({
  qtd,
  item,
}: ItemQtdButtonProps) => {
  const { addItem, reduceItem } = useCarrinhoStore((state) => state);
  const { orcamento, setOrcamento } = useOrcamentoStore((state) => state);
  return (
    <Flex
      borderColor="gray.300"
      flexDirection="row"
      justifyContent="space-between"
      px={1}
      alignItems="center"
      // borderWidth={1}
      rounded="sm"
      mb={2}
    >
      <Button
        variant="unstyled"
        onPress={() => {
          reduceItem(item);
          if (orcamento) {
            const newOrçamento = orcamento + item.preco;
            setOrcamento(newOrçamento);
          }
        }}
        m={0}
        p={0}
      >
        <Text
          m={0}
          p={0}
          color={globalStyles.primaryColor}
          fontSize="3xl"
          fontWeight="bold"
        >
          -
        </Text>
      </Button>
      <Heading m={0} px={6} fontSize="xl">
        {qtd}
      </Heading>
      <Button
        variant="unstyled"
        onPress={() => {
          addItem(item);
          if (orcamento) {
            const newOrçamento = orcamento - item.preco;
            setOrcamento(newOrçamento);
          }
        }}
        m={0}
        p={0}
      >
        <Text
          m={0}
          p={0}
          color={globalStyles.primaryColor}
          fontSize="3xl"
          fontWeight="bold"
        >
          +
        </Text>
      </Button>
    </Flex>
  );
};

export default ItemQtdButton;
