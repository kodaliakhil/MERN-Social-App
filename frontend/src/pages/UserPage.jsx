import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import post1 from "/public/post1.png";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { username } = useParams();
  const showToast = useShowToast();
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setUser(data);
      } catch (error) {
        showToast("Error", error, "error");
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [username]); //4:46:42 to 4:47:47

  if (!user && loading)
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  if (!user && !loading) return <h1>User not found</h1>; // Have to add a User not found error page

  return (
    <>
      <UserHeader user={user.user} />
      <UserPost
        likes={1200}
        replies={401}
        postImg={post1}
        postTitle={"Let's talk about facebook"}
      />
      <UserPost
        likes={120}
        replies={40}
        postImg={post1}
        postTitle={"Let's talk about facebook"}
      />
      <UserPost
        likes={1}
        replies={0}
        postImg={post1}
        postTitle={"Let's talk about facebook"}
      />
    </>
  );
};

export default UserPage;
