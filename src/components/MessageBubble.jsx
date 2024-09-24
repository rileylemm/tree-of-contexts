import React from 'react';

const MessageBubble = ({ message }) => {
  const isUser = message?.sender === 'user';  // Check if sender is 'user'
  const content = message?.content || 'No content available';  // Fallback for missing content

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-3/4 p-3 rounded-lg ${
          isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
        }`}
      >
        {content}
      </div>
    </div>
  );
};

export default MessageBubble;