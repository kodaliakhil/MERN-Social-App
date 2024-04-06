import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";
import useLogout from "../hooks/useLogout";

const LogoutBtn = () => {
const { loading, handleLogout } = useLogout()  
  return (
    <Button size={"xs"} onClick={handleLogout} isLoading={loading}>
      Logout
    </Button>
  );
};

export default LogoutBtn;
