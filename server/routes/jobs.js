const express = require('express');
const router = express.Router();

// Sample companies data
const companies = [
  {
    id: '1',
    name: 'TechVision',
    logo: '/companies/techvision.svg',
    website: 'https://techvision.example.com',
    location: 'San Francisco, CA',
  },
  {
    id: '2',
    name: 'InnovateCorp',
    logo: '/companies/innovatecorp.svg',
    website: 'https://innovatecorp.example.com',
    location: 'New York, NY',
  },
  {
    id: '3',
    name: 'DigitalWave',
    logo: '/companies/digitalwave.svg',
    website: 'https://digitalwave.example.com',
    location: 'Austin, TX',
  },
  {
    id: '4',
    name: 'Quantum Systems',
    logo: '/companies/quantumsystems.svg',
    website: 'https://quantumsystems.example.com',
    location: 'Boston, MA',
  },
  {
    id: '5',
    name: 'NexGen',
    logo: '/companies/nexgen.svg',
    website: 'https://nexgen.example.com',
    location: 'Seattle, WA',
  },
  {
    id: '6',
    name: 'PixelPerfect',
    logo: '/companies/pixelperfect.svg',
    website: 'https://pixelperfect.example.com',
    location: 'Los Angeles, CA',
  },
];

// Sample job tags
const jobTags = [
  { id: '1', name: 'React' },
  { id: '2', name: 'JavaScript' },
  { id: '3', name: 'TypeScript' },
  { id: '4', name: 'Python' },
  { id: '5', name: 'Django' },
  { id: '6', name: 'UI/UX' },
  { id: '7', name: 'Database' },
  { id: '8', name: 'AWS' },
  { id: '9', name: 'Frontend' },
  { id: '10', name: 'Backend' },
  { id: '11', name: 'Full Stack' },
  { id: '12', name: 'DevOps' },
  { id: '13', name: 'Node.js' },
  { id: '14', name: 'Docker' },
  { id: '15', name: 'Kubernetes' },
];

// In-memory jobs data store
let jobs = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: companies[0],
    location: {
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      remote: true,
    },
    salary: {
      min: 100000,
      max: 130000,
      currency: 'USD',
      period: 'yearly',
    },
    employmentType: 'full-time',
    description: 'We are looking for a talented Frontend Developer to join our innovative team.',
    requirements: [
      'Proficient in JavaScript, HTML, CSS, and frontend frameworks like React',
      '3+ years of experience in frontend development',
    ],
    responsibilities: [
      'Develop new user-facing features using React.js',
      'Build reusable components and libraries for future use',
    ],
    tags: [jobTags[0], jobTags[1], jobTags[2]],
    postedAt: '2023-09-15T14:30:00Z',
    applyUrl: 'https://techvision.example.com/careers/frontend-developer',
    featured: true,
  },
  {
    id: '2',
    title: 'Backend Engineer',
    company: companies[1],
    location: {
      city: 'New York',
      state: 'NY',
      country: 'USA',
      remote: false,
    },
    salary: {
      min: 120000,
      max: 150000,
      currency: 'USD',
      period: 'yearly',
    },
    employmentType: 'full-time',
    description: 'InnovateCorp is seeking a Backend Engineer to design, develop, and maintain server-side applications.',
    requirements: [
      'Strong proficiency in Python and Django framework',
      '4+ years of experience in backend development',
    ],
    responsibilities: [
      'Design and implement robust backend solutions',
      'Develop APIs to support client applications',
    ],
    tags: [jobTags[3], jobTags[4]],
    postedAt: '2023-09-10T09:15:00Z',
    applyUrl: 'https://innovatecorp.example.com/careers/backend-engineer',
  },
  {
    id: '3',
    title: 'Full Stack Developer',
    company: companies[2],
    location: {
      city: 'Austin',
      state: 'TX',
      country: 'USA',
      remote: true,
    },
    salary: {
      min: 110000,
      max: 140000,
      currency: 'USD',
      period: 'yearly',
    },
    employmentType: 'full-time',
    description: 'DigitalWave is looking for a Full Stack Developer to join our product team.',
    requirements: [
      'Experience with JavaScript/TypeScript, React, and Node.js',
      'Familiarity with Python/Django is a plus',
    ],
    responsibilities: [
      'Develop and maintain full stack applications',
      'Create scalable backend services and user-friendly frontend interfaces',
    ],
    tags: [jobTags[0], jobTags[2], jobTags[4]],
    postedAt: '2023-09-05T11:45:00Z',
    applyUrl: 'https://digitalwave.example.com/careers/full-stack-developer',
    featured: true,
  },
  {
    id: '4',
    title: 'UI/UX Designer',
    company: companies[5],
    location: {
      city: 'Los Angeles',
      state: 'CA',
      country: 'USA',
      remote: true,
    },
    salary: {
      min: 90000,
      max: 120000,
      currency: 'USD',
      period: 'yearly',
    },
    employmentType: 'full-time',
    description: 'PixelPerfect is seeking a UI/UX Designer to create beautiful, intuitive interfaces for our digital products.',
    requirements: [
      'Strong portfolio demonstrating UI/UX skills',
      '3+ years of experience in UI/UX design',
    ],
    responsibilities: [
      'Create user-centered designs by understanding business requirements',
      'Design wireframes, prototypes, and high-fidelity mockups',
    ],
    tags: [jobTags[5], jobTags[8]],
    postedAt: '2023-09-08T10:00:00Z',
    applyUrl: 'https://pixelperfect.example.com/careers/ui-ux-designer',
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    company: companies[3],
    location: {
      city: 'Boston',
      state: 'MA',
      country: 'USA',
      remote: false,
    },
    salary: {
      min: 115000,
      max: 145000,
      currency: 'USD',
      period: 'yearly',
    },
    employmentType: 'full-time',
    description: 'Quantum Systems is looking for a DevOps Engineer to streamline our development processes.',
    requirements: [
      'Experience with CI/CD pipelines and infrastructure as code',
      'Knowledge of containerization technologies (Docker, Kubernetes)',
    ],
    responsibilities: [
      'Implement and maintain CI/CD pipelines',
      'Automate infrastructure provisioning and configuration',
    ],
    tags: [jobTags[11], jobTags[13]],
    postedAt: '2023-09-12T13:20:00Z',
    applyUrl: 'https://quantumsystems.example.com/careers/devops-engineer',
  },
  {
    id: '6',
    title: 'Data Scientist',
    company: companies[4],
    location: {
      city: 'Seattle',
      state: 'WA',
      country: 'USA',
      remote: true,
    },
    salary: {
      min: 125000,
      max: 160000,
      currency: 'USD',
      period: 'yearly',
    },
    employmentType: 'full-time',
    description: 'NexGen is seeking a Data Scientist to help us extract insights from complex datasets.',
    requirements: [
      'Strong background in statistics, mathematics, or computer science',
      'Experience with data analysis and machine learning techniques',
    ],
    responsibilities: [
      'Develop and implement data models and algorithms',
      'Analyze large datasets to extract actionable insights',
    ],
    tags: [jobTags[3], jobTags[6]],
    postedAt: '2023-09-01T16:00:00Z',
    applyUrl: 'https://nexgen.example.com/careers/data-scientist',
    featured: true,
  },
  {
    id: '7',
    title: 'Product Manager',
    company: companies[0],
    location: {
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      remote: false,
    },
    salary: {
      min: 130000,
      max: 170000,
      currency: 'USD',
      period: 'yearly',
    },
    employmentType: 'full-time',
    description: 'TechVision is looking for a Product Manager to drive the development of innovative products.',
    requirements: [
      '5+ years of experience in product management',
      'Strong analytical and problem-solving skills',
    ],
    responsibilities: [
      'Define product vision, strategy, and roadmap',
      'Gather and prioritize product requirements',
    ],
    tags: [],
    postedAt: '2023-09-03T10:30:00Z',
    applyUrl: 'https://techvision.example.com/careers/product-manager',
  },
  {
    id: '8',
    title: 'QA Engineer',
    company: companies[1],
    location: {
      city: 'New York',
      state: 'NY',
      country: 'USA',
      remote: true,
    },
    salary: {
      min: 90000,
      max: 120000,
      currency: 'USD',
      period: 'yearly',
    },
    employmentType: 'full-time',
    description: 'InnovateCorp is seeking a QA Engineer to ensure the quality of our software products.',
    requirements: [
      'Experience with manual and automated testing methodologies',
      'Knowledge of test planning and execution',
    ],
    responsibilities: [
      'Develop and execute test plans and test cases',
      'Identify, document, and track defects',
    ],
    tags: [],
    postedAt: '2023-09-07T14:00:00Z',
    applyUrl: 'https://innovatecorp.example.com/careers/qa-engineer',
  },
];

// Get all jobs (with optional filtering)
router.get('/', (req, res) => {
  const { search, location, remote, tags } = req.query;
  let filteredJobs = [...jobs];
  
  if (search) {
    const searchTerm = search.toLowerCase();
    filteredJobs = filteredJobs.filter(
      job => 
        job.title.toLowerCase().includes(searchTerm) ||
        job.company.name.toLowerCase().includes(searchTerm) ||
        job.description.toLowerCase().includes(searchTerm)
    );
  }
  
  if (location) {
    const locationTerm = location.toLowerCase();
    filteredJobs = filteredJobs.filter(
      job => 
        (job.location.city?.toLowerCase() || '').includes(locationTerm) ||
        (job.location.state?.toLowerCase() || '').includes(locationTerm) ||
        job.location.country.toLowerCase().includes(locationTerm)
    );
  }
  
  if (remote === 'true') {
    filteredJobs = filteredJobs.filter(job => job.location.remote);
  }
  
  if (tags) {
    const tagIds = tags.split(',');
    filteredJobs = filteredJobs.filter(job => 
      job.tags.some(tag => tagIds.includes(tag.id))
    );
  }
  
  res.json(filteredJobs);
});

// Get a specific job by ID
router.get('/:id', (req, res) => {
  const job = jobs.find(job => job.id === req.params.id);
  
  if (!job) {
    return res.status(404).json({ message: 'Job not found' });
  }
  
  res.json(job);
});

// Get featured jobs
router.get('/featured/list', (req, res) => {
  const featuredJobs = jobs.filter(job => job.featured);
  res.json(featuredJobs);
});

// Get all job tags
router.get('/tags/all', (req, res) => {
  res.json(jobTags);
});

// Get recent jobs (posted in the last 7 days)
router.get('/recent/list', (req, res) => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  const recentJobs = jobs.filter(job => new Date(job.postedAt) >= oneWeekAgo);
  res.json(recentJobs);
});

// Create a new job
router.post('/', (req, res) => {
  const { 
    title, 
    companyName, 
    location, 
    employmentType, 
    description, 
    applyUrl 
  } = req.body;
  
  if (!title || !companyName || !location || !employmentType || !description || !applyUrl) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  
  // Find or create company
  let company = companies.find(c => c.name.toLowerCase() === companyName.toLowerCase());
  
  if (!company) {
    company = {
      id: `company-${Date.now()}`,
      name: companyName,
      location: `${location.city || ''}, ${location.state || ''}`.trim(),
    };
    companies.push(company);
  }
  
  const newJob = {
    id: `job-${Date.now()}`,
    title,
    company,
    location,
    employmentType,
    description,
    requirements: [],
    responsibilities: [],
    tags: [],
    postedAt: new Date().toISOString(),
    applyUrl
  };
  
  jobs.unshift(newJob);
  res.status(201).json(newJob);
});

// Update a job
router.put('/:id', (req, res) => {
  const jobId = req.params.id;
  const index = jobs.findIndex(job => job.id === jobId);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Job not found' });
  }
  
  const updatedJob = {
    ...jobs[index],
    ...req.body,
    id: jobId // Ensure ID doesn't change
  };
  
  jobs[index] = updatedJob;
  res.json(updatedJob);
});

// Delete a job
router.delete('/:id', (req, res) => {
  const jobId = req.params.id;
  const index = jobs.findIndex(job => job.id === jobId);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Job not found' });
  }
  
  const deletedJob = jobs.splice(index, 1)[0];
  res.json(deletedJob);
});

module.exports = router;
