import { Button, Flex, Heading, Text } from "native-base";
import React, { useState } from "react";
import { itemCarrinho, useCarrinhoStore } from "../../storage/carrinho";
import { useOrcamentoStore } from "../../storage/orcamento";
import { globalStyles } from "../../styles/globalStyles";
import RemoveItemModal from "./RemoveItemModal";

// import { Container } from './styles';

type ItemQtdButtonProps = {
  qtd: number;
  item: itemCarrinho;
  displayQtdButtons?: boolean;
};

const ItemQtdButton: React.FC<ItemQtdButtonProps> = ({
  qtd,
  item,
  displayQtdButtons = true,
}: ItemQtdButtonProps) => {
  const {
    addItem,
    reduceItem,
    removeItemModalIsOpen,
    setRemoveItemModalIsOpen,
    setSelectedItemToRemove,
  } = useCarrinhoStore((state) => state);
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
      {displayQtdButtons && (
        <Button
          variant="unstyled"
          onPress={() => {
            if (item.quantidade === 1) {
              setRemoveItemModalIsOpen(true);
              setSelectedItemToRemove(item);
            } else {
              reduceItem(item);
              if (orcamento) {
                setRemoveItemModalIsOpen;
                const newOrçamento = orcamento + item.preco;
                setOrcamento(newOrçamento);
              }
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
      )}
      <Heading
        m={0}
        px={6}
        fontSize="xl"
        borderWidth={displayQtdButtons ? 0 : 1}
        borderColor="gray.800"
        rounded="sm"
      >
        {qtd}
      </Heading>
      {displayQtdButtons && (
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
      )}
    </Flex>
  );
};

export default ItemQtdButton;
