import {
  Modal,
  Heading,
  Text,
  Image,
  Flex,
  IconButton,
  Icon,
  Skeleton,
  Spinner,
  Box,
} from "native-base";
import React, { useEffect, useState } from "react";
import { useCarrinhoStore } from "../../storage/carrinho";
import { globalStyles } from "../../styles/globalStyles";
import MainButton from "../MainButton";
import { MaterialIcons } from "@expo/vector-icons";
import { useSugestaoModalStore } from "../../storage/sugestaoModal";
import { useOrcamentoStore } from "../../storage/orcamento";
import { useCarrinhoEconomicoStore } from "../../storage/carrinhoEconomico";

// import { Container } from './styles';

type SugestedItemsModalProps = {
  isCarrinhoEconomico?: boolean;
};

const SuggestedItemsModal: React.FC<SugestedItemsModalProps> = ({
  isCarrinhoEconomico = false,
}: SugestedItemsModalProps) => {
  const {
    suggestedItems,
    changeCarrinhoItemForSuggestedByIndex,
    toChangeCarrinhoItemID,
    carrinho,
    changeCarrinhoItemForSuggestedBySuggestedObject,
  } = useCarrinhoStore((state) => state);
  const { changeCarrinhoItemForSuggested } = useCarrinhoEconomicoStore(
    (state) => state
  );

  const { originalOrcamento, setOrcamento } = useOrcamentoStore(
    (state) => state
  );

  const [displayedItem, setDisplayedItem] = useState(suggestedItems[0]);

  useEffect(() => {
    setDisplayedItem(suggestedItems[0]);
  }, [suggestedItems]);

  const [index, setIndex] = useState(0);
  const { visible, setVisible, loading } = useSugestaoModalStore(
    (state) => state
  );
  
  function nextDisplayedItem() {
    const index = suggestedItems.indexOf(displayedItem);
    if (index + 1 < suggestedItems.length) {
      setDisplayedItem(suggestedItems[index + 1]);
      setIndex(index + 1);
    }
  }

  function previousDisplayedItem() {
    const index = suggestedItems.indexOf(displayedItem);
    if (index - 1 >= 0) {
      setDisplayedItem(suggestedItems[index - 1]);
      setIndex(index - 1);
    }
  }

  function updateOrcamento() {
    const newOrcamento = carrinho.itens.reduce((acc, item) => {
      return acc + item.valorTotal;
    }, 0);
    let newOrcamentoWithDiscount = 0;
    if (originalOrcamento) {
      newOrcamentoWithDiscount = originalOrcamento - newOrcamento;
    }
    setOrcamento(newOrcamentoWithDiscount);
  }

  function handleChangeItemToSuggested() {
    if (isCarrinhoEconomico) {
      changeCarrinhoItemForSuggested(toChangeCarrinhoItemID, displayedItem);
      changeCarrinhoItemForSuggestedBySuggestedObject(
        displayedItem,
        toChangeCarrinhoItemID
      );
    } else {
      changeCarrinhoItemForSuggestedByIndex(index, toChangeCarrinhoItemID);
    }
    if (originalOrcamento) {
      console.log("update");

      updateOrcamento();
    }
    setDisplayedItem(suggestedItems[0]);
    setIndex(0);
    setVisible(false);
  }

  return (
    <Modal isOpen={visible}>
      <Modal.Content>
        <Modal.CloseButton onPress={() => setVisible(false)} />
        <Modal.Header alignItems="center">
          <Heading color={globalStyles.primaryColor}>Sugestões</Heading>
        </Modal.Header>
        <Modal.Body alignItems="center" justifyContent="center" flexDir="row">
          <Skeleton isLoaded={!loading} rounded="md" height={40}>
            {
              // display button only if there is a previous item
              index - 1 >= 0 ? (
                <IconButton
                  backgroundColor="transparent"
                  icon={<Icon as={MaterialIcons} name="keyboard-arrow-left" />}
                  rounded="full"
                  _icon={{
                    size: "5xl",
                    color: "gray.400",
                  }}
                  _pressed={{ bgColor: "gray.200" }}
                  onPress={previousDisplayedItem}
                />
              ) : (
                  <Box w={16}></Box>
              )
            }

            <Image
              source={{ uri: displayedItem.image_url }}
              alt="Imagem do item"
              height={40}
              width={40}

              // resizeMode="contain"
            />
            {
              // display button only if has next item
              index + 1 < suggestedItems.length ? (
                <IconButton
                  backgroundColor="transparent"
                  icon={<Icon as={MaterialIcons} name="keyboard-arrow-right" />}
                  rounded="full"
                  _icon={{
                    size: "5xl",
                    color: "gray.400",
                  }}
                  _pressed={{ bgColor: "gray.200" }}
                  onPress={nextDisplayedItem}
                />
              ): (
                <Box w={16}></Box>
            )
            }
          </Skeleton>
        </Modal.Body>
        <Modal.Footer
          justifyContent="center"
          bgColor={globalStyles.primaryColor}
        >
          <Flex justify="center" align="center">
            {loading ? (
              <Flex height={20} justify="center" align="center">
                <Spinner color="white" />
              </Flex>
            ) : (
              <>
                <Heading fontSize="lg" color={globalStyles.mainTextColor}>
                  {displayedItem.nome}
                </Heading>

                <Heading mb={4} color={globalStyles.mainTextColor}>
                  R${" "}
                  {displayedItem.valor.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </Heading>
                <MainButton
                  onPress={handleChangeItemToSuggested}
                  text="Trocar"
                  width={20}
                />
              </>
            )}
          </Flex>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default SuggestedItemsModal;
