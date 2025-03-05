
// Mock data for community groups
const groupsData = [
  {
    id: 1,
    type: 'whatsapp',
    title: 'Job Seekers WhatsApp Group',
    description: 'Daily job updates, resume reviews, and interview preparation tips.',
    members: '2.5k+',
    link: 'https://chat.whatsapp.com/example',
  },
  {
    id: 2,
    type: 'telegram',
    title: 'Career Opportunities Telegram',
    description: 'Exclusive job postings, networking opportunities, and career resources.',
    members: '5k+',
    link: 'https://t.me/example',
  },
  {
    id: 3,
    type: 'whatsapp',
    title: 'Tech Jobs Community',
    description: 'For IT professionals and tech job seekers. Industry insights and job alerts.',
    members: '1.8k+',
    link: 'https://chat.whatsapp.com/tech-example',
  },
  {
    id: 4,
    type: 'telegram',
    title: 'Remote Work Opportunities',
    description: 'Focus on remote and flexible work options across all industries.',
    members: '3.2k+',
    link: 'https://t.me/remote-example',
  }
];

// In a real application, this would interact with an API
export const getGroups = () => {
  return new Promise((resolve) => {
    // Simulating API delay
    setTimeout(() => {
      resolve(groupsData);
    }, 500);
  });
};

export const getGroupById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const group = groupsData.find(group => group.id === parseInt(id));
      if (group) {
        resolve(group);
      } else {
        reject(new Error('Group not found'));
      }
    }, 300);
  });
};

export const addGroup = (groupData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newGroup = {
        id: Math.max(...groupsData.map(g => g.id), 0) + 1,
        ...groupData,
      };
      groupsData.push(newGroup);
      resolve(newGroup);
    }, 300);
  });
};

export const updateGroup = (id, updatedData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = groupsData.findIndex(group => group.id === parseInt(id));
      if (index !== -1) {
        groupsData[index] = { ...groupsData[index], ...updatedData };
        resolve(groupsData[index]);
      } else {
        reject(new Error('Group not found'));
      }
    }, 300);
  });
};

export const deleteGroup = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = groupsData.findIndex(group => group.id === parseInt(id));
      if (index !== -1) {
        const deletedGroup = groupsData.splice(index, 1)[0];
        resolve(deletedGroup);
      } else {
        reject(new Error('Group not found'));
      }
    }, 300);
  });
};
