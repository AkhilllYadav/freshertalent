
import { toast } from 'sonner';
import { getGroups, addGroup, updateGroup, deleteGroup } from '@/services/groupService';

export const initialGroupFormData = {
  title: '',
  description: '',
  type: 'whatsapp',
  link: '',
  members: '0+'
};

export const fetchGroups = async (setGroups, setLoading) => {
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

export const saveGroup = async (formData, isEditing, editId, resetForm, onSuccess) => {
  // Validate form
  if (!formData.title || !formData.description || !formData.link) {
    toast.error('Please fill all required fields');
    return false;
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
    if (onSuccess) onSuccess();
    return true;
  } catch (error) {
    console.error('Error saving group:', error);
    toast.error(isEditing ? 'Failed to update group' : 'Failed to add group');
    return false;
  }
};

export const removeGroup = async (id, onSuccess) => {
  if (window.confirm('Are you sure you want to delete this group?')) {
    try {
      await deleteGroup(id);
      toast.success('Group deleted successfully');
      if (onSuccess) onSuccess();
      return true;
    } catch (error) {
      console.error('Error deleting group:', error);
      toast.error('Failed to delete group');
      return false;
    }
  }
  return false;
};
