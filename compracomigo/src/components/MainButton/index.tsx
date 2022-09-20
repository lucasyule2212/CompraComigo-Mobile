import { Button, Text } from "native-base";
import React from "react";
import { globalStyles } from "../../styles/globalStyles";

// import { Container } from './styles';

type MainButtonProps = {
  text: string;
  onPress: () => void;
  colorScheme?: "primary" | "secondary";
  width?: number;
  fontSize?: string | number;
};

const MainButton: React.FC<MainButtonProps> = ({
  text,
  onPress,
  colorScheme = "primary",
  width,
  fontSize = "md",

}: MainButtonProps) => {
  return (
    <Button
      w={width ?? "auto"}
      m={0}
      p={2}
      mb={4}
      _pressed={{
        bgColor: colorScheme === "primary" ? "gray.200" : "orange.400",
      }}
      rounded="full"
      bgColor={
        colorScheme === "primary"
          ? globalStyles.mainTextColor
          : globalStyles.primaryColor
      }
      onPress={() => onPress()}
    >
      <Text
        color={
          colorScheme === "primary"
            ? globalStyles.primaryColor
            : globalStyles.mainTextColor
        }
        fontWeight="semibold"
        fontSize={fontSize}
      >
        {text}
      </Text>
    </Button>
  );
};

export default MainButton;
