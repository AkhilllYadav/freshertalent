
const express = require('express');
const router = express.Router();

// In-memory data store (will be replaced with a database in production)
let groups = [
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

// Get all groups
router.get('/', (req, res) => {
  res.json(groups);
});

// Get group by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const group = groups.find(g => g.id === id);
  
  if (!group) {
    return res.status(404).json({ message: 'Group not found' });
  }
  
  res.json(group);
});

// Create a new group
router.post('/', (req, res) => {
  const { type, title, description, members, link } = req.body;
  
  if (!type || !title || !description || !members || !link) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  const newId = Math.max(...groups.map(g => g.id), 0) + 1;
  
  const newGroup = {
    id: newId,
    type,
    title,
    description,
    members,
    link
  };
  
  groups.push(newGroup);
  res.status(201).json(newGroup);
});

// Update a group
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { type, title, description, members, link } = req.body;
  
  const index = groups.findIndex(g => g.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Group not found' });
  }
  
  groups[index] = {
    ...groups[index],
    type: type || groups[index].type,
    title: title || groups[index].title,
    description: description || groups[index].description,
    members: members || groups[index].members,
    link: link || groups[index].link
  };
  
  res.json(groups[index]);
});

// Delete a group
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = groups.findIndex(g => g.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Group not found' });
  }
  
  const deletedGroup = groups.splice(index, 1)[0];
  res.json(deletedGroup);
});

module.exports = router;
