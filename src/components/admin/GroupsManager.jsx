
import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import GroupForm from './groups/GroupForm';
import GroupsTable from './groups/GroupsTable';
import { initialGroupFormData, fetchGroups, saveGroup, removeGroup } from '@/utils/groupUtils';

export const GroupsManager = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialGroupFormData);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchGroups(setGroups, setLoading);
  }, []);

  const resetForm = () => {
    setFormData(initialGroupFormData);
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
    await saveGroup(
      formData, 
      isEditing, 
      editId, 
      resetForm, 
      () => fetchGroups(setGroups, setLoading)
    );
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
    await removeGroup(id, () => fetchGroups(setGroups, setLoading));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        {isEditing ? 'Edit Group' : 'Add New Group'}
      </h2>
      
      <GroupForm 
        formData={formData}
        setFormData={setFormData}
        isEditing={isEditing}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
        handleSubmit={handleSubmit}
        resetForm={resetForm}
      />
      
      <h2 className="text-xl font-semibold mb-4">Existing Groups</h2>
      
      <GroupsTable 
        groups={groups}
        loading={loading}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};
