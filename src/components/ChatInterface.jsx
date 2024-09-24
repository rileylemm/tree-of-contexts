import { generateResponse } from '../api/gptApi';
import React, { useState } from 'react';
import { Send, GitBranch } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MessageBubble from './MessageBubble';
import NewBranchDialog from './NewBranchDialog';

const ChatInterface = ({ currentBranch, onSendMessage, onNewBranch }) => {
  const [message, setMessage] = useState('');
  const [isNewBranchDialogOpen, setIsNewBranchDialogOpen] = useState(false);

  const handleSendMessage = async () => {
    if (message.trim()) {
      const userMessage = { role: 'user', content: message }; // Create user message
      onSendMessage(userMessage);  // Display user message

      try {
        const response = await generateResponse(message);  // Call GPT API
        const gptMessage = { role: 'assistant', content: response.choices[0].text };  // For completion model  // Extract GPT response
        onSendMessage(gptMessage);  // Display GPT response
      } catch (error) {
        console.error('Error generating response:', error);
      }

      setMessage('');  // Clear input field
    }
  };

  const handleNewBranch = (branchName) => {
    onNewBranch(branchName);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {currentBranch.messages.map((msg, index) => (
           <MessageBubble key={index} message={msg.content} />
        ))}
      </div>
      <div className="border-t p-4">
        <div className="flex space-x-2 mb-2">
          <Button onClick={() => setIsNewBranchDialogOpen(true)} variant="outline">
            <GitBranch className="h-4 w-4 mr-2" />
            New Branch
          </Button>
        </div>
        <div className="flex space-x-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <NewBranchDialog
        isOpen={isNewBranchDialogOpen}
        onClose={() => setIsNewBranchDialogOpen(false)}
        onCreateBranch={handleNewBranch}
      />
    </div>
  );
};

export default ChatInterface;