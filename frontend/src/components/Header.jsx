import { Flex, Image, useColorMode } from "@chakra-ui/react";
import  lightLogo  from "/light-logo.svg";
import darkLogo  from "/dark-logo.svg";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex justifyContent={"center"} mt={6} mb={12}>
      <Image
        cursor={"pointer"}
        alt="logo"
        w={6}
        src={colorMode === "dark" ? lightLogo : darkLogo}
        onClick={toggleColorMode}
      />
    </Flex>
  );
};

export default Header;
