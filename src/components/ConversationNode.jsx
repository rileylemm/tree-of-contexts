import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, GitBranch } from 'lucide-react';

const ConversationNode = ({ node, addResponse }) => {
  const [newResponse, setNewResponse] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  const handleAddResponse = () => {
    if (newResponse.trim()) {
      addResponse(node.id, newResponse);
      setNewResponse('');
    }
  };

  return (
    <div className="ml-4 mt-2 border-l-2 border-gray-200 pl-4">
      <div className="flex items-center">
        <MessageSquare className="mr-2 h-4 w-4" />
        <p className="font-medium">{node.content}</p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-2"
        >
          {isExpanded ? '▼' : '►'}
        </Button>
      </div>
      {isExpanded && (
        <>
          <div className="mt-2 flex">
            <Input
              type="text"
              value={newResponse}
              onChange={(e) => setNewResponse(e.target.value)}
              placeholder="Enter a response"
              className="mr-2"
            />
            <Button onClick={handleAddResponse}>
              <GitBranch className="mr-2 h-4 w-4" />
              Branch
            </Button>
          </div>
          {node.children.map(child => (
            <ConversationNode
              key={child.id}
              node={child}
              addResponse={addResponse}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default ConversationNode;