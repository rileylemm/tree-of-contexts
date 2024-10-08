import React, { useState } from 'react';
import ConversationNode from './ConversationNode';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const TreeView = ({ trees = [], setTrees, onSelectBranch }) => {
  const [newSeed, setNewSeed] = useState('');

  const addNewSeed = () => {
    if (newSeed.trim()) {
      const newTree = { id: Date.now(), content: newSeed, children: [], messages: [] };
      setTrees([...trees, newTree]);
      setNewSeed('');
      onSelectBranch(newTree);
    }
  };

  const addResponse = (treeId, nodeId, response) => {
    setTrees(trees.map(tree => {
      if (tree.id === treeId) {
        return addNodeToTree(tree, nodeId, response);
      }
      return tree;
    }));
  };

  const addNodeToTree = (node, targetId, newContent) => {
    if (node.id === targetId) {
      const newNode = { id: Date.now(), content: newContent, children: [], messages: [] };
      const updatedNode = { ...node, children: [...node.children, newNode] };
      onSelectBranch(newNode);
      return updatedNode;
    }
    return {
      ...node,
      children: node.children.map(child => addNodeToTree(child, targetId, newContent))
    };
  };

  return (
    <div>
      <div className="mb-4">
        <Input
          type="text"
          value={newSeed}
          onChange={(e) => setNewSeed(e.target.value)}
          placeholder="Enter a new seed context"
          className="mr-2"
        />
        <Button onClick={addNewSeed}>Plant New Seed</Button>
      </div>
      {trees.map(tree => (
        <ConversationNode
          key={tree.id}
          node={tree}
          addResponse={(nodeId, response) => addResponse(tree.id, nodeId, response)}
          onSelectBranch={onSelectBranch}
        />
      ))}
    </div>
  );
};

export default TreeView;
