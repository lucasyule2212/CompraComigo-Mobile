import { Box, Spinner } from "native-base";
import { useCarrinhoStore } from "../../../../storage/carrinho";
// import Image from "react-native";
import { useCallback } from "react";
import { FlatList, View } from "react-native";
import EconomicItemComponent from "../../../../components/EconomicItemComponent";
import SuggestedItemsModal from "../../../../components/SugestedItemsModal";
import { useCarrinhoEconomicoStore } from "../../../../storage/carrinhoEconomico";

// import { Container } from './styles';

const Body: React.FC = () => {
  const { carrinho, suggestedItems, loading } = useCarrinhoStore(
    (state) => state
  );
  const { carrinhoEconomico } = useCarrinhoEconomicoStore((state) => state);

  const renderItem = useCallback(
    ({ item }: { item: any }) => <EconomicItemComponent item={item} />,
    [carrinhoEconomico]
  );


  return (
    <Box height="75%" p={4}>
      {suggestedItems.length > 0 && <SuggestedItemsModal isCarrinhoEconomico={true} />}
      <View>
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          data={carrinhoEconomico?.carrinhoEconomico}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListFooterComponent={<View style={{ height: 40 }} />}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          onMoveShouldSetResponder={() => true}
        />
        {loading && <Spinner color="warning.500" size="sm" />}
      </View>
    </Box>
  );
};

export default Body;
