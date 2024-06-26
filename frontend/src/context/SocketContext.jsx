import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";

const SocketContext = createContext();
export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  console.log(onlineUsers);
  const user = useRecoilValue(userAtom);
  useEffect(() => {
    const socket = io(import.meta.env.VITE_BACKEND_URL, {
      //  backend url
      query: {
        userId: user?._id,
      },
    });
    setSocket(socket);
    socket.on("getOnlineUsers", (users) => {
      //getOnlineUsers is an event emitted by the server.
      setOnlineUsers(users);
    });
    return () => socket && socket.close();
  }, [user?._id]);
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
