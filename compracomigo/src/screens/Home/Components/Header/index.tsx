import { Flex, Heading, Button, Text } from "native-base";
import MainButton from "../../../../components/MainButton";
import { useCarrinhoStore } from "../../../../storage/carrinho";
import { useOrcamentoStore } from "../../../../storage/orcamento";
import { globalStyles } from "../../../../styles/globalStyles";

// import { Container } from './styles';

const Header: React.FC = () => {
  const { clearCarrinho } = useCarrinhoStore((state) => state);
  const { resetOrcamento } = useOrcamentoStore((state) => state);
  return (
    <Flex
      justify="center"
      align="center"
      borderBottomColor="gray.100"
      borderBottomWidth={2}
      p={4}
      flexDirection="row"
    >
      <Flex flex={1} justify="center" align="center">
        <Heading ml={20} fontSize="3xl" color={globalStyles.primaryColor}>
          {" "}
          Carrinho{" "}
        </Heading>
      </Flex>

      <Flex justify="end">
        <MainButton
          colorScheme="secondary"
          onPress={() => {
            resetOrcamento();
            clearCarrinho();
          }}
          text="Limpar"
          width={20}
        />
      </Flex>
    </Flex>
  );
};

export default Header;
