import { Flex, Heading, Icon, Image, Modal, Text } from "native-base";
import React from "react";
import { useCarrinhoStore } from "../../storage/carrinho";
import { globalStyles } from "../../styles/globalStyles";
import MainButton from "../MainButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// import { Container } from './styles';

const ItemPriorizadoModal: React.FC = () => {
  const {
    priorizarFirstTime,
    priorizarModalVisible,
    setPriorizarModalVisible,
  } = useCarrinhoStore((state) => state);

  return (
    <Modal isOpen={priorizarModalVisible}>
      <Modal.Content>
        <Modal.CloseButton onPress={() => setPriorizarModalVisible(false)} />
        <Modal.Header alignItems="center">
          <Heading color={globalStyles.primaryColor}>Item Priorizado!</Heading>
        </Modal.Header>
        <Modal.Body alignItems="center" justifyContent="center" flexDir="row">
          <Icon
            as={MaterialCommunityIcons}
            name="star-shooting"
            color="yellow.400"
            size={20}
          />
        </Modal.Body>
        <Modal.Footer
          justifyContent="center"
          bgColor={globalStyles.primaryColor}
        >
          <Flex justify="center" align="center">
            <Heading
              fontSize="2xl"
              textAlign="center"
              color={globalStyles.mainTextColor}
              mb={4}
            >
              Você priorizou um item da sua lista!
            </Heading>

            <Text
              textAlign="center"
              fontSize="md"
              color={globalStyles.mainTextColor}
            >
              Agora sabemos que você deseja levar exatamente esse item e não
              iremos sugerir similares na{" "}
              <Text fontWeight={800}>Lista Econômica</Text>.
            </Text>
          </Flex>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ItemPriorizadoModal;
