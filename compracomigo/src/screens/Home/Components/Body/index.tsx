import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  IconButton,
  Icon,
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

// import { Container } from './styles';

const Body: React.FC = () => {
  const { carrinho } = useCarrinhoStore((state) => state);
  const renderItem = useCallback(
    ({ item }: { item: any }) => <ItemComponent item={item} />,
    []
  );
  return (
    <Box height="70%" p={4}>
      {carrinho.itens.length === 0 ? (
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
        <View style={{ flex: 1, flexGrow: 1, height: "100%" }}>
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
        </View>
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
          onPress={() => {}}
        />
      </Box>
    </Box>
  );
};

export default Body;
