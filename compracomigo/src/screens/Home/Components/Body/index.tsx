import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  IconButton,
  Icon,
  useDisclose,
  Spinner,
} from "native-base";
import { useCarrinhoStore } from "../../../../storage/carrinho";
import { globalStyles } from "../../../../styles/globalStyles";
// import Image from "react-native";
import ItemComponent from "../../../../components/ItemComponent";
import carrinhoImage from "./assets/carrinho.png";
import scan from "./assets/scan.png";
import seta from "./assets/seta.png";
import { FlatList, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLeitorBarraStore } from "../../../../storage/leitorBarra";
import SuggestedItemsModal from "../../../../components/SugestedItemsModal";
import ItemPriorizadoModal from "../../../../components/ItemPriorizadoModal";
import RemoveItemModal from "../../../../components/ItemQtdButton/RemoveItemModal";

// import { Container } from './styles';

const Body: React.FC = () => {
  const {
    carrinho,
    suggestedItems,
    loading,
    removeItemModalIsOpen,
    setRemoveItemModalIsOpen,
  } = useCarrinhoStore((state) => state);

  const { askForCameraPermission } = useLeitorBarraStore((state) => state);
  const renderItem = useCallback(
    ({ item }: { item: any }) => <ItemComponent item={item} />,
    []
  );

  return (
    <Box height="70%" p={4}>
      {suggestedItems.length > 0 && <SuggestedItemsModal />}
      <ItemPriorizadoModal />
      <RemoveItemModal
        isOpen={removeItemModalIsOpen}
        setIsOpen={() => setRemoveItemModalIsOpen(true)}
      />

      {loading && carrinho.itens.length === 0 ? (
        <Flex width="100%" height="100%" align="center" rounded="md" zIndex={0}>
          <Spinner color="warning.500" size="lg" />
          <Text fontWeight={500} mt={2} color="orange.400">
            Adicionando item...
          </Text>
        </Flex>
      ) : carrinho.itens.length === 0 ? (
        <Flex width="100%" align="center" justify="center" mb={6} mt={24}>
          <Image source={carrinhoImage} alt="Imagem carrinho" />
          <Heading color="gray.500" mb={2} mt={6}>
            Carrinho vazio ...
          </Heading>
          <Text fontWeight="semibold" color="gray.400">
            Escaneie novos itens para adicioná-los ao carrinho!
          </Text>
          <Image
            mt={4}
            height={200}
            width={110}
            ml="30%"
            source={seta}
            alt="Imagem seta"
          />
        </Flex>
      ) : (
        <Flex flex={1}>
          <FlatList
            contentContainerStyle={{ flexGrow: 1 }}
            data={carrinho.itens}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            ListFooterComponent={<View style={{ height: 40 }} />}
            onEndReachedThreshold={0.5}
            showsVerticalScrollIndicator={false}
            onMoveShouldSetResponder={() => true}
          />
          {loading && <Spinner color="warning.500" size="sm" />}
        </Flex>
      )}

      <Box position="absolute" bottom={0} right={8}>
        <IconButton
          width={20}
          height={20}
          backgroundColor={globalStyles.primaryColor}
          icon={<Icon as={MaterialCommunityIcons} name="barcode-scan" />}
          rounded="full"
          _icon={{
            size: "5xl",
            color: "white",
          }}
          _pressed={{ bgColor: "orange.400" }}
          onPress={() => {
            askForCameraPermission();
          }}
        />
      </Box>
    </Box>
  );
};

export default Body;
