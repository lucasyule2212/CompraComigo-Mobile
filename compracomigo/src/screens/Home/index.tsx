import { View } from "react-native";
import Body from "./Components/Body";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import { styles } from "./styles";
// import { Container } from './styles';

const Home: React.FC = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Body />
      <Footer />
    </View>
  );
};

export default Home;
