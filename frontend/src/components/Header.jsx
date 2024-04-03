import { Flex, Image, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import lightLogo from "/light-logo.svg";
import darkLogo from "/dark-logo.svg";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import LogoutBtn from "./LogoutBtn";
import authScreenAtom from "../atoms/authAtom";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  return (
    <Flex justifyContent={"space-between"} mt={6} mb={12}>
      {user && (
        <Link to={"/"}>
          <AiFillHome size={24} />
        </Link>
      )}
      {!user && <Link to={'/auth'} onClick={() => setAuthScreen("login")}>Login</Link>}
      <Image
        cursor={"pointer"}
        alt="logo"
        w={6}
        src={colorMode === "dark" ? lightLogo : darkLogo}
        onClick={toggleColorMode}
      />
      {user && (
        <Flex alignItems={"center"} gap={4}>
          <Link to={`/${user.username}`}>
            <RxAvatar size={24} />
          </Link>
          <LogoutBtn />
        </Flex>
      )}

      {!user && <Link to={'/auth'} onClick={() => setAuthScreen("signup")}>Sign Up</Link>}
    </Flex>
  );
};

export default Header;
