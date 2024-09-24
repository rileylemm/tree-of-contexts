import React from 'react';
import { Scroll, GitBranch } from 'lucide-react';

const Sidebar = ({ trees }) => {
  return (
    <div className="w-64 bg-gray-100 p-4 h-screen overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Conversation Tree</h2>
      {trees.map((tree) => (
        <div key={tree.id} className="mb-4">
          <div className="flex items-center mb-2">
            <Scroll className="mr-2 h-4 w-4" />
            <span className="font-medium">{tree.content}</span>
          </div>
          {renderBranches(tree.children)}
        </div>
      ))}
    </div>
  );
};

const renderBranches = (branches, depth = 1) => {
  return branches.map((branch) => (
    <div key={branch.id} className={`ml-${depth * 4}`}>
      <div className="flex items-center my-1">
        <GitBranch className="mr-2 h-3 w-3" />
        <span className="text-sm">{branch.content}</span>
      </div>
      {branch.children.length > 0 && renderBranches(branch.children, depth + 1)}
    </div>
  ));
};

export default Sidebar;