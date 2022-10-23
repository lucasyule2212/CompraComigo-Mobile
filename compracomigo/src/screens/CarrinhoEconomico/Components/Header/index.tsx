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
      borderBottomColor="gray.100"
      borderBottomWidth={2}
      p={4}
      flexDirection="row"
      >
      <Heading fontSize="3xl" color={globalStyles.primaryColor}>
        {" "}
        Carrinho Econômico
      </Heading>
    </Flex>
  );
};

export default Header;
