import { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import {
  fetchChats,
  accessChat,
  sendMessage,
  setSelectedChat,
  receiveMessage,
} from '../features/chat/chatSlice';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { chats, selectedChat } = useSelector((state) => state.chat);
  const [socket, setSocket] = useState(null);
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    if (userInfo) {
      const newSocket = io(process.env.REACT_APP_API_URL);
      setSocket(newSocket);

      return () => newSocket.close();
    }
  }, [userInfo]);

  useEffect(() => {
    if (socket && userInfo) {
      socket.emit('setup', userInfo);
      socket.on('message received', (newMessage) => {
        if (!selectedChat || selectedChat._id !== newMessage.chat._id) {
          setNotification((prev) => [...prev, newMessage]);
        } else {
          dispatch(receiveMessage(newMessage));
        }
      });
    }
  }, [socket, userInfo, selectedChat, dispatch]);

  const fetchChatsHandler = async () => {
    dispatch(fetchChats());
  };

  const accessChatHandler = async (userId) => {
    dispatch(accessChat(userId));
  };

  const sendMessageHandler = async (content, chatId) => {
    if (socket) {
      dispatch(sendMessage({ content, chatId, socket }));
    }
  };

  const setSelectedChatHandler = (chat) => {
    dispatch(setSelectedChat(chat));
  };

  const chatContextValue = {
    socket,
    chats,
    selectedChat,
    notification,
    setNotification,
    fetchChats: fetchChatsHandler,
    accessChat: accessChatHandler,
    sendMessage: sendMessageHandler,
    setSelectedChat: setSelectedChatHandler,
  };

  return (
    <ChatContext.Provider value={chatContextValue}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);