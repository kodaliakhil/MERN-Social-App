import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import post1 from "/public/post1.png";

const UserPage = () => {
  return (
    <>
      <UserHeader />
      <UserPost likes={1200} replies={401} postImg={post1} postTitle={"Let's talk about facebook" }/>
      <UserPost likes={120} replies={40} postImg={post1} postTitle={"Let's talk about facebook" }/>
      <UserPost likes={1} replies={0} postImg={post1} postTitle={"Let's talk about facebook" }/>
     
    </>
  );
};

export default UserPage;
