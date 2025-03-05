
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { getGroups, addGroup, updateGroup, deleteGroup } from '@/services/groupService';
import { PlusCircle, Pencil, Trash2, ExternalLink } from 'lucide-react';

export const GroupsManager = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'whatsapp',
    link: '',
    members: '0+'
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const data = await getGroups();
      setGroups(data);
    } catch (error) {
      console.error('Error fetching groups:', error);
      toast.error('Failed to load groups');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      type: 'whatsapp',
      link: '',
      members: '0+'
    });
    setIsEditing(false);
    setEditId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (value) => {
    setFormData({ ...formData, type: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title || !formData.description || !formData.link) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      if (isEditing) {
        await updateGroup(editId, formData);
        toast.success('Group updated successfully');
      } else {
        await addGroup(formData);
        toast.success('Group added successfully');
      }
      resetForm();
      fetchGroups();
    } catch (error) {
      console.error('Error saving group:', error);
      toast.error(isEditing ? 'Failed to update group' : 'Failed to add group');
    }
  };

  const handleEdit = (group) => {
    setFormData({
      title: group.title,
      description: group.description,
      type: group.type,
      link: group.link,
      members: group.members
    });
    setEditId(group.id);
    setIsEditing(true);
    
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this group?')) {
      try {
        await deleteGroup(id);
        toast.success('Group deleted successfully');
        fetchGroups();
      } catch (error) {
        console.error('Error deleting group:', error);
        toast.error('Failed to delete group');
      }
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        {isEditing ? 'Edit Group' : 'Add New Group'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Group Title*</label>
            <Input 
              name="title" 
              value={formData.title} 
              onChange={handleInputChange} 
              placeholder="Group title"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Group Type*</label>
            <Select
              value={formData.type}
              onValueChange={handleSelectChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
                <SelectItem value="telegram">Telegram</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Description*</label>
          <Textarea 
            name="description" 
            value={formData.description} 
            onChange={handleInputChange} 
            placeholder="Group description"
            rows={3}
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Group Link*</label>
            <Input 
              name="link" 
              value={formData.link} 
              onChange={handleInputChange} 
              placeholder={formData.type === 'whatsapp' ? 'https://chat.whatsapp.com/...' : 'https://t.me/...'}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Members*</label>
            <Input 
              name="members" 
              value={formData.members} 
              onChange={handleInputChange} 
              placeholder="e.g., 1.5k+"
              required
            />
          </div>
        </div>
        
        <div className="flex space-x-3">
          <Button type="submit">
            {isEditing ? 'Update Group' : 'Add Group'}
          </Button>
          {isEditing && (
            <Button type="button" variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          )}
        </div>
      </form>
      
      <h2 className="text-xl font-semibold mb-4">Existing Groups</h2>
      
      {loading ? (
        <div className="text-center py-10">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-2">Loading groups...</p>
        </div>
      ) : groups.length === 0 ? (
        <p className="text-center py-6 text-muted-foreground">No groups available</p>
      ) : (
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
      )}
    </div>
  );
};
