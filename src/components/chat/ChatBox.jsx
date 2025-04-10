import { useState, useEffect, useRef } from 'react';
import { Button, Form, ListGroup, Image } from 'react-bootstrap';
import { useChat } from '../../context/ChatContext';
import Message from './Message';
import Loader from '../common/Loader';

const ChatBox = () => {
  const [newMessage, setNewMessage] = useState('');
  const { socket, selectedChat, sendMessage, notification, setNotification } =
    useChat();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessageHandler = (e) => {
    e.preventDefault();
    if (newMessage.trim() && selectedChat) {
      sendMessage(newMessage, selectedChat._id);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      {selectedChat ? (
        <>
          <div className="p-3 border-b flex items-center">
            <Image
              src={
                selectedChat.participants[0]._id ===
                JSON.parse(localStorage.getItem('userInfo'))._id
                  ? selectedChat.participants[1].avatar?.url ||
                    '/images/default-avatar.png'
                  : selectedChat.participants[0].avatar?.url ||
                    '/images/default-avatar.png'
              }
              roundedCircle
              width={40}
              height={40}
              className="mr-3"
            />
            <span className="font-semibold">
              {selectedChat.participants[0]._id ===
              JSON.parse(localStorage.getItem('userInfo'))._id
                ? selectedChat.participants[1].name
                : selectedChat.participants[0].name}
            </span>
          </div>

          <div className="flex-grow p-3 overflow-y-auto">
            {selectedChat.messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-10">
                No messages yet. Start the conversation!
              </div>
            ) : (
              <ListGroup variant="flush">
                {selectedChat.messages.map((message) => (
                  <Message
                    key={message._id}
                    message={message}
                    currentUser={JSON.parse(localStorage.getItem('userInfo'))._id}
                  />
                ))}
                <div ref={messagesEndRef} />
              </ListGroup>
            )}
          </div>

          <div className="p-3 border-t">
            <Form onSubmit={sendMessageHandler}>
              <div className="flex">
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-grow mr-2"
                />
                <Button type="submit" variant="primary">
                  Send
                </Button>
              </div>
            </Form>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h4>Select a chat to start messaging</h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;