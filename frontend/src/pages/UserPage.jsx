import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import Post from "../components/Post";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";

const UserPage = () => {
  const { user, loading } = useGetUserProfile();
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [fetchingPosts, setFetchingPosts] = useState(true);
  const { username } = useParams();
  const showToast = useShowToast();
  useEffect(() => {
    const getPosts = async () => {
      if (!user) return;
      setFetchingPosts(true);
      try {
        const res = await fetch(`/api/posts/user/${username}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setPosts(data);
      } catch (error) {
        showToast("Error", error, "error");
      } finally {
        setFetchingPosts(false);
      }
    };
    getPosts();
  }, [username, showToast, setPosts, user]); //4:46:42 to 4:47:47

  if (!user && loading)
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  if (!user && !loading) return <h1>User not found</h1>; // Have to add a User not found error page

  return (
    <>
      <UserHeader user={user} />
      {fetchingPosts ? (
        <Flex justifyContent={"center"} my={12}>
          <Spinner size={"xl"} />
        </Flex>
      ) : posts.length === 0 ? (
        <h1>User has no posts.</h1>
      ) : (
        posts.map((post) => (
          <Post key={post._id} post={post} postedBy={post.postedBy} />
        ))
      )}
    </>
  );
};

export default UserPage;
