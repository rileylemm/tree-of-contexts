import React, { useState } from 'react';
import TreeView from '../components/TreeView';
import Sidebar from '../components/Sidebar';
import ChatInterface from '../components/ChatInterface';

const Index = () => {
  const [trees, setTrees] = useState([]);
  const [currentBranch, setCurrentBranch] = useState(null);

  const handleSelectBranch = (branch) => {
    setCurrentBranch(branch);
  };

  const handleSendMessage = (message) => {
    if (currentBranch) {
      const updatedTrees = trees.map(tree => updateTreeMessages(tree, currentBranch.id, message));
      setTrees(updatedTrees);
      setCurrentBranch(prevBranch => ({
        ...prevBranch,
        messages: [...prevBranch.messages, { content: message, sender: 'user' }]
      }));
    }
  };

  const updateTreeMessages = (node, targetId, message) => {
    if (node.id === targetId) {
      return {
        ...node,
        messages: [...node.messages, { content: message, sender: 'user' }]
      };
    }
    return {
      ...node,
      children: node.children.map(child => updateTreeMessages(child, targetId, message))
    };
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar trees={trees} />
      <div className="flex-1 flex">
        <div className="w-1/3 p-4 border-r">
          <h2 className="text-2xl font-bold mb-4">Conversation Tree</h2>
          <TreeView trees={trees} setTrees={setTrees} onSelectBranch={handleSelectBranch} />
        </div>
        <div className="w-2/3 p-4">
          <h2 className="text-2xl font-bold mb-4">Chat Interface</h2>
          {currentBranch ? (
            <ChatInterface currentBranch={currentBranch} onSendMessage={handleSendMessage} />
          ) : (
            <p>Select a branch to start chatting</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
