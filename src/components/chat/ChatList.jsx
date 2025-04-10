import { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useChat } from '../../context/ChatContext';
import { useGetChatsQuery } from '../../features/chat/chatApiSlice';
import Loader from '../common/Loader';
import Message from '../common/Message';

const ChatList = () => {
  const { data: chats, isLoading, error, refetch } = useGetChatsQuery();
  const { selectedChat, setSelectedChat } = useChat();

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="h-full overflow-y-auto">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <ListGroup variant="flush">
          {chats?.map((chat) => (
            <ListGroup.Item
              key={chat._id}
              onClick={() => setSelectedChat(chat)}
              active={selectedChat?._id === chat._id}
              action
              className="flex items-center p-3 hover:bg-gray-100 cursor-pointer"
            >
              <div className="flex items-center">
                <img
                  src={
                    chat.participants[0]._id ===
                    JSON.parse(localStorage.getItem('userInfo'))._id
                      ? chat.participants[1].avatar?.url ||
                        '/images/default-avatar.png'
                      : chat.participants[0].avatar?.url ||
                        '/images/default-avatar.png'
                  }
                  alt="User"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-semibold">
                    {chat.participants[0]._id ===
                    JSON.parse(localStorage.getItem('userInfo'))._id
                      ? chat.participants[1].name
                      : chat.participants[0].name}
                  </p>
                  {chat.latestMessage && (
                    <p className="text-sm text-gray-500 truncate">
                      {chat.latestMessage.content}
                    </p>
                  )}
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default ChatList;