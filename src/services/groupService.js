
// Updated groupService.js to use the backend API
const API_URL = 'http://localhost:5000/api';

export const getGroups = async () => {
  try {
    const response = await fetch(`${API_URL}/groups`);
    if (!response.ok) {
      throw new Error(`Failed to fetch groups: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Fetched groups from API:', data);
    return data;
  } catch (error) {
    console.error('Error in getGroups:', error);
    throw error;
  }
};

export const getGroupById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/groups/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch group: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error in getGroupById:', error);
    throw error;
  }
};

export const addGroup = async (groupData) => {
  try {
    const response = await fetch(`${API_URL}/groups`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(groupData),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to add group: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error in addGroup:', error);
    throw error;
  }
};

export const updateGroup = async (id, updatedData) => {
  try {
    const response = await fetch(`${API_URL}/groups/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update group: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error in updateGroup:', error);
    throw error;
  }
};

export const deleteGroup = async (id) => {
  try {
    const response = await fetch(`${API_URL}/groups/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete group: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error in deleteGroup:', error);
    throw error;
  }
};
