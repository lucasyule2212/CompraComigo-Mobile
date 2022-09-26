import {
  Modal,
  Heading,
  Text,
  Image,
  Flex,
  IconButton,
  Icon,
} from "native-base";
import React, { useState } from "react";
import { useCarrinhoStore } from "../../storage/carrinho";
import { globalStyles } from "../../styles/globalStyles";
import MainButton from "../MainButton";
import { MaterialIcons } from "@expo/vector-icons";
import { useSugestaoModalStore } from "../../storage/sugestaoModal";
import { useOrcamentoStore } from "../../storage/orcamento";

// import { Container } from './styles';

const SuggestedItemsModal: React.FC = () => {
  const {
    suggestedItems,
    changeCarrinhoItemForSuggestedByIndex,
    toChangeCarrinhoItemID,
    carrinho,
  } = useCarrinhoStore((state) => state);

  const { originalOrcamento, setOrcamento } = useOrcamentoStore(
    (state) => state
  );

  const [displayedItem, setDisplayedItem] = useState(suggestedItems[0]);
  const [index, setIndex] = useState(0);
  const { visible, setVisible } = useSugestaoModalStore((state) => state);

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
    changeCarrinhoItemForSuggestedByIndex(index, toChangeCarrinhoItemID);
    if (originalOrcamento) {
      updateOrcamento();
    }
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
          <Image
            source={{ uri: displayedItem.image_url }}
            alt="Imagem do item"
            height={40}
            width={40}
            // resizeMode="contain"
          />
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
        </Modal.Body>
        <Modal.Footer
          justifyContent="center"
          bgColor={globalStyles.primaryColor}
        >
          <Flex justify="center" align="center">
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
          </Flex>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default SuggestedItemsModal;
