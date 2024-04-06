import React from "react";
import { Text, Button } from "@chakra-ui/react";
import useShowToast from "../hooks/useShowToast";
import useLogout from "../hooks/useLogout";

const SettingsPage = () => {
  const showToast = useShowToast();
  const { loading, handleLogout, setLoading } = useLogout();

  const freezeAccount = async () => {
    setLoading(true);
    if (!window.confirm("Are you sure you want to freeze your account?"))
      return;
    try {
      const res = await fetch("/api/users/freeze", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.error) {
        return showToast("Error", data.error, "error");
      }
      if (data.success) {
        await handleLogout();
        showToast("Success", "Your account has been frozen", "success");
      }
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Text my={1} fontWeight={"bold"}>
        Freeze Your Account
      </Text>
      <Text my={1}>You can unfreeze your account anytime by logging in.</Text>
      <Button size={"sm"} colorScheme="red" onClick={freezeAccount} isLoading={loading}>
        Freeze
      </Button>
    </>
  );
};

export default SettingsPage;
