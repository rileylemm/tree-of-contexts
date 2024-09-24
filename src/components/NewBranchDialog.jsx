import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const NewBranchDialog = ({ isOpen, onClose, onCreateBranch }) => {
  const [newBranchName, setNewBranchName] = useState('');

  const handleCreate = () => {
    if (newBranchName.trim()) {
      onCreateBranch(newBranchName);
      setNewBranchName('');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Branch</DialogTitle>
          <DialogDescription>
            Enter a name for the new branch.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            id="branchName"
            value={newBranchName}
            onChange={(e) => setNewBranchName(e.target.value)}
            placeholder="Enter branch name"
          />
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleCreate}>Create Branch</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewBranchDialog;