import React from 'react';
import TreeView from '../components/TreeView';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">GPT Conversation Tree</h1>
      <TreeView />
    </div>
  );
};

export default Index;
