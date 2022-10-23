import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Flex, Heading, Icon, Modal, Text } from "native-base";
import React, { Dispatch, SetStateAction } from "react";
import { useCarrinhoStore } from "../../../storage/carrinho";
import { useOrcamentoStore } from "../../../storage/orcamento";
import { globalStyles } from "../../../styles/globalStyles";
import MainButton from "../../MainButton";

// import { Container } from './styles';
type RemoveItemModalProps = {
  isOpen: boolean;
  setIsOpen: () => void;
};

const RemoveItemModal: React.FC<RemoveItemModalProps> = ({
  isOpen,
  setIsOpen,
}: RemoveItemModalProps) => {
  const { setRemoveItemModalIsOpen, reduceItem, selectedItemToRemove } =
    useCarrinhoStore((state) => state);
  const { orcamento, setOrcamento } = useOrcamentoStore((state) => state);
  return (
    <Modal isOpen={isOpen}>
      <Modal.Content>
        <Modal.CloseButton onPress={() => setIsOpen()} />
        <Modal.Header alignItems="center">
          <Heading color={globalStyles.primaryColor}>Remover Item</Heading>
        </Modal.Header>
        <Modal.Body alignItems="center" justifyContent="center" flexDir="row">
          <Heading color={globalStyles.primaryColor} fontSize="md">
            Deseja mesmo remover esse item?
          </Heading>
        </Modal.Body>
        <Modal.Footer
          justifyContent="center"
          // bgColor={globalStyles.primaryColor}
        >
          <Flex flexDir="row" justify="space-between" align="center" w="80%">
            <MainButton
              text="Cancelar"
              fontSize="sm"
              onPress={() => {
                setRemoveItemModalIsOpen(false);
              }}
            />
            <MainButton
              text="Remover"
              fontSize="sm"
              colorScheme="secondary"
              onPress={() => {
                if (selectedItemToRemove) {
                  if (orcamento) {
                    setRemoveItemModalIsOpen(true);
                    const newOrçamento = orcamento + selectedItemToRemove.preco;
                    setOrcamento(newOrçamento);
                  }
                  reduceItem(selectedItemToRemove);
                }
                setRemoveItemModalIsOpen(false);
              }}
            />
          </Flex>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default RemoveItemModal;
