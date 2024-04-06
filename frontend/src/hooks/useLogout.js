import React, { useState } from "react";
import useShowToast from "./useShowToast";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const setUser = useSetRecoilState(userAtom);
  const showToast = useShowToast();

  const handleLogout = async () => {
    setLoading(true);
    try {
      // fetch /logout
      const res = await fetch("/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      localStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setLoading(false);
    }
  };
  return { loading, handleLogout, setLoading };
};

export default useLogout;
