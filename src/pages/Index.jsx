import React, { useState } from 'react';
import TreeView from '../components/TreeView';
import Sidebar from '../components/Sidebar';

const Index = () => {
  const [trees, setTrees] = useState([]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar trees={trees} />
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-8 text-center">GPT Conversation Tree</h1>
        <TreeView trees={trees} setTrees={setTrees} />
      </div>
    </div>
  );
};

export default Index;
