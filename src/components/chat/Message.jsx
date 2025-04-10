import { format } from 'timeago.js';
import { Image } from 'react-bootstrap';

const Message = ({ message, currentUser }) => {
  return (
    <div
      className={`flex mb-4 ${
        message.sender._id === currentUser ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`flex max-w-xs lg:max-w-md ${
          message.sender._id === currentUser ? 'flex-row-reverse' : ''
        }`}
      >
        <div className="flex-shrink-0">
          <Image
            src={message.sender.avatar?.url || '/images/default-avatar.png'}
            roundedCircle
            width={32}
            height={32}
          />
        </div>
        <div
          className={`ml-2 mr-2 py-2 px-4 rounded-lg ${
            message.sender._id === currentUser
              ? 'bg-indigo-500 text-white'
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          <p>{message.content}</p>
          <p
            className={`text-xs mt-1 ${
              message.sender._id === currentUser
                ? 'text-indigo-100'
                : 'text-gray-500'
            }`}
          >
            {format(message.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Message;