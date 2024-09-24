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

  const handleNewBranch = () => {
    if (currentBranch) {
      const newBranch = {
        id: Date.now(),
        content: `Branch from ${currentBranch.content}`,
        children: [],
        messages: []
      };

      const updatedTrees = trees.map(tree => addNewBranchToTree(tree, currentBranch.id, newBranch));
      setTrees(updatedTrees);
      setCurrentBranch(newBranch);
    }
  };

  const addNewBranchToTree = (node, targetId, newBranch) => {
    if (node.id === targetId) {
      return {
        ...node,
        children: [...node.children, newBranch]
      };
    }
    return {
      ...node,
      children: node.children.map(child => addNewBranchToTree(child, targetId, newBranch))
    };
  };

  const handleRenameBranch = (branchId, newName) => {
    const updatedTrees = trees.map(tree => renameBranchInTree(tree, branchId, newName));
    setTrees(updatedTrees);
    if (currentBranch && currentBranch.id === branchId) {
      setCurrentBranch(prevBranch => ({ ...prevBranch, content: newName }));
    }
  };

  const renameBranchInTree = (node, targetId, newName) => {
    if (node.id === targetId) {
      return { ...node, content: newName };
    }
    return {
      ...node,
      children: node.children.map(child => renameBranchInTree(child, targetId, newName))
    };
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        trees={trees}
        onSelectBranch={handleSelectBranch}
        onRenameBranch={handleRenameBranch}
      />
      <div className="flex-1 flex">
        <div className="w-1/3 p-4 border-r">
          <h2 className="text-2xl font-bold mb-4">Conversation Tree</h2>
          <TreeView trees={trees} setTrees={setTrees} onSelectBranch={handleSelectBranch} />
        </div>
        <div className="w-2/3 p-4">
          <h2 className="text-2xl font-bold mb-4">Chat Interface</h2>
          {currentBranch ? (
            <ChatInterface
              currentBranch={currentBranch}
              onSendMessage={handleSendMessage}
              onNewBranch={handleNewBranch}
            />
          ) : (
            <p>Select a branch to start chatting</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
