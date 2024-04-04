import { Avatar, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { selectedConversationAtom } from "../atoms/conversationsAtom";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";

const Message = ({ message, ownMessage }) => {
  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const currentUser = useRecoilValue(userAtom);
  console.log(message);
  return (
    <>
      {ownMessage ? (
        <Flex gap={2} alignSelf={"flex-end"}>
          <Text maxW={"350px"} bg={"blue.400"} p={1} borderRadius={"md"}>
            {message.text}
          </Text>
          <Avatar src={currentUser.profilePic} w={7} h={7} />
        </Flex>
      ) : (
        <Flex gap={2}>
          <Avatar src={selectedConversation.userProfilePic} w={7} h={7} />

          <Text
            maxW={"350px"}
            bg={"gray.400"}
            p={1}
            borderRadius={"md"}
            color={"black"}
          >
            {message.text}
          </Text>
        </Flex>
      )}
    </>
  );
};

export default Message;
