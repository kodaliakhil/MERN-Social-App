import React, { useState } from "react";
import useShowToast from "./useShowToast";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";

const useFollowUnfollow = (user) => {
  const currentUser = useRecoilValue(userAtom); //  logged in User
  const [following, setFollowing] = useState(
    user?.followers.includes(currentUser?._id)
  );
  const [updating, setUpdating] = useState(false);
  const showToast = useShowToast();
  async function handleFollowUnfollow() {
    if (!currentUser) {
      showToast("Error", "Please Login to Follow", "error");
      return;
    }
    if (updating) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/users/follow/${user._id}`, {
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
      if (following) {
        user.followers.pop();
      } else {
        user.followers.push(currentUser?._id);
      }
      setFollowing(!following);
      showToast("Success", data.message, "success");
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setUpdating(false);
    }
  }
  return { handleFollowUnfollow, updating, following };
};

export default useFollowUnfollow;
