import {
  Avatar,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { useState } from "react";
import useShowToast from "../hooks/useShowToast";
import useFollowUnfollow from "../hooks/useFollowUnfollow";

const UserHeader = ({ user }) => {
  const toast = useToast();
  const currentUser = useRecoilValue(userAtom); //  logged in User
  // const [following, setFollowing] = useState(
  //   user?.followers.includes(currentUser?._id)
  // );
  // const [updating, setUpdating] = useState(false);
  // const showToast = useShowToast();
  const { handleFollowUnfollow, updating, following } = useFollowUnfollow(user);
  function copyURL() {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(() => {
      toast({
        title: "Link Copied",
        description: "We've copied the link for you.",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    });
  }
  // async function handleFollowUnfollow() {
  //   if (!currentUser) {
  //     showToast("Error", "Please Login to Follow", "error");
  //     return;
  //   }
  //   if (updating) return;
  //   setUpdating(true);
  //   try {
  //     const res = await fetch(`/api/users/follow/${user._id}`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const data = await res.json();
  //     if (data.error) {
  //       showToast("Error", data.error, "error");
  //       return;
  //     }
  //     if (following) {
  //       user.followers.pop();
  //     } else {
  //       user.followers.push(currentUser?._id);
  //     }
  //     setFollowing(!following);
  //     showToast("Success", data.message, "success");
  //   } catch (error) {
  //     showToast("Error", error, "error");
  //   } finally {
  //     setUpdating(false);
  //   }
  // }
  return (
    <VStack gap={4} alignItems={"start"}>
      {/*//////////////////////////////// User details header ////////////////////////////*/}
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text>{user.name}</Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"small"}>{user.username}</Text>
            <Text
              bg={"gray.dark"}
              color={"gray.light"}
              p={1}
              borderRadius={"full"}
              fontSize={"xs"}
            >
              threads.next
            </Text>
          </Flex>
        </Box>
        <Box>
          {
            <Avatar
              name={user.name}
              src={
                user.profilePic ? user.profilePic : "https://bit.ly/broken-link"
              }
              size={{ base: "md", md: "xl" }}
            />
          }
        </Box>
      </Flex>
      <Text>{user.bio}</Text>
      {currentUser?._id === user._id ? (
        <Link to="/update">
          <Button size={"sm"}>Update Profile</Button>
        </Link>
      ) : (
        <Button size={"sm"} onClick={handleFollowUnfollow} isLoading={updating}>
          {following ? "Unfollow" : "Follow"}
        </Button>
      )}
      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>{user.followers.length} followers</Text>
          <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
          <Link color="gray.light">instagram.com</Link>
        </Flex>
        <Flex>
          <Box className="icon-container">
            <BsInstagram size={25} cursor={"pointer"} />
          </Box>
          <Box className="icon-container">
            <Menu>
              <MenuButton>
                <CgMoreO size={25} cursor={"pointer"} />
              </MenuButton>
              <Portal>
                <MenuList bg={"gray.dark"}>
                  <MenuItem bg={"gray.dark"} onClick={copyURL}>
                    Copy link
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>

      <Flex w={"full"}>
        <Flex
          flex={1}
          borderBottom={"1.5px solid white"}
          justifyContent={"center"}
          pb="3"
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>Threads</Text>
        </Flex>
        <Flex
          flex={1}
          borderBottom={"1px solid gray"}
          justifyContent={"center"}
          color={"gray.light"}
          pb="3"
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>Replies</Text>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default UserHeader;
