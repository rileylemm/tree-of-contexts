import React, { useState } from 'react';
import { Scroll, GitBranch, Edit2, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Sidebar = ({ trees = [], onSelectBranch, onRenameBranch }) => {
  const [editingBranch, setEditingBranch] = useState(null);
  const [newBranchName, setNewBranchName] = useState('');

  const handleEditClick = (branch) => {
    setEditingBranch(branch.id);
    setNewBranchName(branch.content);
  };

  const handleSaveEdit = (branch) => {
    onRenameBranch(branch.id, newBranchName);
    setEditingBranch(null);
    setNewBranchName('');
  };

  const renderBranches = (branches, depth = 1) => {
    return branches.map((branch) => (
      <div key={branch.id} className={`ml-${depth * 4}`}>
        {editingBranch === branch.id ? (
          <div className="flex items-center my-1">
            <Input
              value={newBranchName}
              onChange={(e) => setNewBranchName(e.target.value)}
              className="mr-2 text-sm"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSaveEdit(branch)}
            >
              <Check className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center my-1">
            <Button
              variant="ghost"
              className="flex items-center w-full justify-start"
              onClick={() => onSelectBranch(branch)}
            >
              <GitBranch className="mr-2 h-3 w-3" />
              <span className="text-sm">{branch.content}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEditClick(branch)}
            >
              <Edit2 className="h-3 w-3" />
            </Button>
          </div>
        )}
        {branch.children.length > 0 && renderBranches(branch.children, depth + 1)}
      </div>
    ));
  };

  return (
    <div className="w-64 bg-gray-100 p-4 h-screen overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Conversation Tree</h2>
      {trees.map((tree) => (
        <div key={tree.id} className="mb-4">
          {editingBranch === tree.id ? (
            <div className="flex items-center mb-2">
              <Input
                value={newBranchName}
                onChange={(e) => setNewBranchName(e.target.value)}
                className="mr-2"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSaveEdit(tree)}
              >
                <Check className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center mb-2">
              <Button
                variant="ghost"
                className="flex items-center w-full justify-start"
                onClick={() => onSelectBranch(tree)}
              >
                <Scroll className="mr-2 h-4 w-4" />
                <span className="font-medium">{tree.content}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEditClick(tree)}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            </div>
          )}
          {renderBranches(tree.children)}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
