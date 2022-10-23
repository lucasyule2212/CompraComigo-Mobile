import { BarCodeScanner } from "expo-barcode-scanner";
import { Flex, Icon, IconButton } from "native-base";
import React from "react";
import { useLeitorBarraStore } from "../../../../storage/leitorBarra";
import { globalStyles } from "../../../../styles/globalStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { api } from "../../../../services/api";
import { useCarrinhoStore } from "../../../../storage/carrinho";
import { useOrcamentoStore } from "../../../../storage/orcamento";
// import { Container } from './styles';

const BarcodeScan: React.FC = () => {
  const { scanned, setHasPermission, setScanned } = useLeitorBarraStore(
    (state) => state
  );
  const { addItem, setLoading } = useCarrinhoStore((state) => state);
  const { setOrcamento, orcamento } = useOrcamentoStore((state) => state);

  async function handleBarCodeScanned({ data }: { data: string }) {
    setHasPermission(false);
    setLoading(true);
    const { data: produto } = await api.get(`/produtos/${data}`);

    addItem(produto);
    if (orcamento) {
      const newOrcamento = orcamento - produto.preco;
      setOrcamento(newOrcamento);
    }
    setLoading(false);
  }

  return (
    <Flex width="100%" height="100%" align="center">
      <Flex
        width="100%"
        px={5}
        justify="center"
        height={50}
        bgColor={globalStyles.primaryColor}
      >
        <IconButton
          width={10}
          height={10}
          backgroundColor="transparent"
          icon={<Icon as={MaterialCommunityIcons} name="close" />}
          rounded="full"
          _icon={{
            size: "2xl",
            color: "white",
          }}
          _pressed={{ bgColor: "orange.400" }}
          onPress={() => setHasPermission(false)}
        />
      </Flex>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ width: "100%", height: "90%" }}
      />
      <Flex flex={1} bgColor={globalStyles.primaryColor} width="100%">
        {" "}
      </Flex>
    </Flex>
  );
};

export default BarcodeScan;
