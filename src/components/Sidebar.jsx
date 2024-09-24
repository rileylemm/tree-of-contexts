import React from 'react';
import { Scroll, GitBranch } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Sidebar = ({ trees = [], onSelectBranch }) => {
  return (
    <div className="w-64 bg-gray-100 p-4 h-screen overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Conversation Tree</h2>
      {trees.map((tree) => (
        <div key={tree.id} className="mb-4">
          <Button
            variant="ghost"
            className="flex items-center w-full justify-start mb-2"
            onClick={() => onSelectBranch(tree)}
          >
            <Scroll className="mr-2 h-4 w-4" />
            <span className="font-medium">{tree.content}</span>
          </Button>
          {renderBranches(tree.children, onSelectBranch)}
        </div>
      ))}
    </div>
  );
};

const renderBranches = (branches, onSelectBranch, depth = 1) => {
  return branches.map((branch) => (
    <div key={branch.id} className={`ml-${depth * 4}`}>
      <Button
        variant="ghost"
        className="flex items-center w-full justify-start my-1"
        onClick={() => onSelectBranch(branch)}
      >
        <GitBranch className="mr-2 h-3 w-3" />
        <span className="text-sm">{branch.content}</span>
      </Button>
      {branch.children.length > 0 && renderBranches(branch.children, onSelectBranch, depth + 1)}
    </div>
  ));
};

export default Sidebar;
