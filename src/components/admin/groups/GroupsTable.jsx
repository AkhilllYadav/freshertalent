
import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2, ExternalLink } from 'lucide-react';

const GroupsTable = ({ groups, loading, handleEdit, handleDelete }) => {
  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
        <p className="mt-2">Loading groups...</p>
      </div>
    );
  }

  if (groups.length === 0) {
    return (
      <p className="text-center py-6 text-muted-foreground">No groups available</p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Members</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {groups.map((group) => (
          <TableRow key={group.id}>
            <TableCell className="font-medium">{group.title}</TableCell>
            <TableCell className="capitalize">{group.type}</TableCell>
            <TableCell>{group.members}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => window.open(group.link, '_blank')}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleEdit(group)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleDelete(group.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default GroupsTable;
