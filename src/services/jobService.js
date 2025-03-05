// Mock companies
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

// Mock job tags
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

// Mock job listings
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
    description: 'We are looking for a talented Frontend Developer to join our innovative team. You will be responsible for implementing visual elements and their behaviors with user interactions. You will work with designers and backend developers to create seamless user interfaces.',
    requirements: [
      'Proficient in JavaScript, HTML, CSS, and frontend frameworks like React',
      '3+ years of experience in frontend development',
      'Strong understanding of responsive design principles',
      'Experience with state management libraries (Redux, MobX, etc.)',
      'Excellent problem-solving skills',
    ],
    responsibilities: [
      'Develop new user-facing features using React.js',
      'Build reusable components and libraries for future use',
      'Translate designs and wireframes into high-quality code',
      'Optimize components for maximum performance',
      'Collaborate with backend developers to integrate frontend components with APIs',
    ],
    tags: [jobTags[0], jobTags[1], jobTags[2], jobTags[8]],
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
    description: 'InnovateCorp is seeking a Backend Engineer to design, develop, and maintain server-side applications. You will work on the core architecture of our products, ensuring they are scalable, efficient, and maintainable.',
    requirements: [
      'Strong proficiency in Python and Django framework',
      '4+ years of experience in backend development',
      'Experience with RESTful APIs and microservices',
      'Knowledge of database systems, both SQL and NoSQL',
      'Understanding of server-side templating languages',
    ],
    responsibilities: [
      'Design and implement robust backend solutions',
      'Develop APIs to support client applications',
      'Optimize application performance and responsiveness',
      'Collaborate with frontend developers to integrate user-facing elements',
      'Ensure data storage solutions are secure and scalable',
    ],
    tags: [jobTags[3], jobTags[4], jobTags[6], jobTags[9]],
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
    description: 'DigitalWave is looking for a Full Stack Developer to join our product team. You will work on both the frontend and backend of our applications, bringing designs to life and implementing server-side logic.',
    requirements: [
      'Experience with JavaScript/TypeScript, React, and Node.js',
      'Familiarity with Python/Django is a plus',
      '3+ years of full stack development experience',
      'Understanding of MVC design patterns',
      'Knowledge of database query optimization and performance tuning',
    ],
    responsibilities: [
      'Develop and maintain full stack applications',
      'Create scalable backend services and user-friendly frontend interfaces',
      'Ensure cross-platform optimization and responsiveness',
      'Collaborate with designers, product managers, and other developers',
      'Implement security and data protection measures',
    ],
    tags: [jobTags[0], jobTags[2], jobTags[4], jobTags[10], jobTags[12]],
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
    description: 'PixelPerfect is seeking a UI/UX Designer to create beautiful, intuitive interfaces for our digital products. You will work closely with product managers and developers to transform complex requirements into elegant design solutions.',
    requirements: [
      'Strong portfolio demonstrating UI/UX skills',
      '3+ years of experience in UI/UX design',
      'Proficiency in design tools (Figma, Sketch, Adobe XD)',
      'Understanding of user-centered design principles',
      'Experience with design systems and component libraries',
    ],
    responsibilities: [
      'Create user-centered designs by understanding business requirements',
      'Design wireframes, prototypes, and high-fidelity mockups',
      'Conduct user research and usability testing',
      'Collaborate with developers to ensure design implementation accuracy',
      'Maintain and evolve design systems',
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
    description: 'Quantum Systems is looking for a DevOps Engineer to streamline our development processes. You will automate deployments, optimize infrastructure, and ensure the reliability and scalability of our systems.',
    requirements: [
      'Experience with CI/CD pipelines and infrastructure as code',
      'Knowledge of containerization technologies (Docker, Kubernetes)',
      'Familiarity with cloud platforms (AWS, GCP, Azure)',
      '3+ years of DevOps experience',
      'Understanding of monitoring and logging systems',
    ],
    responsibilities: [
      'Implement and maintain CI/CD pipelines',
      'Automate infrastructure provisioning and configuration',
      'Monitor system performance and troubleshoot issues',
      'Collaborate with development teams to improve deployment processes',
      'Ensure system security and compliance',
    ],
    tags: [jobTags[11], jobTags[13], jobTags[14]],
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
    description: 'NexGen is seeking a Data Scientist to help us extract insights from complex datasets. You will develop algorithms, build models, and work with teams across the company to drive data-informed decisions.',
    requirements: [
      'Strong background in statistics, mathematics, or computer science',
      'Experience with data analysis and machine learning techniques',
      'Proficiency in Python and data science libraries',
      '3+ years of experience in data science or related field',
      'Knowledge of SQL and database systems',
    ],
    responsibilities: [
      'Develop and implement data models and algorithms',
      'Analyze large datasets to extract actionable insights',
      'Create visualizations to communicate findings',
      'Collaborate with product and engineering teams',
      'Stay current with the latest technologies and methodologies',
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
    description: 'TechVision is looking for a Product Manager to drive the development of innovative products. You will work with cross-functional teams to define product strategy, gather requirements, and ensure successful delivery.',
    requirements: [
      '5+ years of experience in product management',
      'Strong analytical and problem-solving skills',
      'Excellent communication and leadership abilities',
      'Experience with agile methodologies',
      'Technical background or understanding of software development',
    ],
    responsibilities: [
      'Define product vision, strategy, and roadmap',
      'Gather and prioritize product requirements',
      'Work with engineering, design, and marketing teams',
      'Analyze market trends and competitor activities',
      'Drive product launches and go-to-market strategies',
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
    description: 'InnovateCorp is seeking a QA Engineer to ensure the quality of our software products. You will design and implement tests, identify defects, and collaborate with developers to resolve issues.',
    requirements: [
      'Experience with manual and automated testing methodologies',
      'Knowledge of test planning and execution',
      'Familiarity with bug tracking and test management tools',
      '3+ years of experience in software testing',
      'Understanding of software development life cycle',
    ],
    responsibilities: [
      'Develop and execute test plans and test cases',
      'Identify, document, and track defects',
      'Perform regression testing and verifying bug fixes',
      'Collaborate with development teams to improve software quality',
      'Participate in code reviews and quality assurance meetings',
    ],
    tags: [],
    postedAt: '2023-09-07T14:00:00Z',
    applyUrl: 'https://innovatecorp.example.com/careers/qa-engineer',
  },
];

// Simulate an API call with delay
const simulateApiCall = (data, delay = 500) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

export const jobService = {
  /**
   * Fetch all jobs with optional filtering
   */
  getAllJobs: async (filters) => {
    let filteredJobs = [...jobs];

    if (filters) {
      if (filters.search) {
        const searchTerms = filters.search.toLowerCase();
        filteredJobs = filteredJobs.filter(
          job => 
            job.title.toLowerCase().includes(searchTerms) ||
            job.company.name.toLowerCase().includes(searchTerms) ||
            job.description.toLowerCase().includes(searchTerms)
        );
      }

      if (filters.location) {
        const locationTerms = filters.location.toLowerCase();
        filteredJobs = filteredJobs.filter(
          job => 
            (job.location.city?.toLowerCase() || '').includes(locationTerms) ||
            (job.location.state?.toLowerCase() || '').includes(locationTerms) ||
            job.location.country.toLowerCase().includes(locationTerms)
        );
      }

      if (filters.remote) {
        filteredJobs = filteredJobs.filter(job => job.location.remote);
      }

      if (filters.tags && filters.tags.length > 0) {
        filteredJobs = filteredJobs.filter(job => 
          job.tags.some(tag => filters.tags.includes(tag.id))
        );
      }
    }

    return simulateApiCall(filteredJobs);
  },

  /**
   * Fetch a specific job by ID
   */
  getJobById: async (id) => {
    const job = jobs.find(job => job.id === id);
    return simulateApiCall(job);
  },

  /**
   * Fetch featured jobs
   */
  getFeaturedJobs: async () => {
    const featuredJobs = jobs.filter(job => job.featured);
    return simulateApiCall(featuredJobs);
  },

  /**
   * Fetch all available job tags
   */
  getAllTags: async () => {
    return simulateApiCall(jobTags);
  },

  /**
   * Get recent jobs (posted in the last 7 days)
   */
  getRecentJobs: async () => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const recentJobs = jobs.filter(job => new Date(job.postedAt) >= oneWeekAgo);
    return simulateApiCall(recentJobs);
  },

  /**
   * Add a new job posting
   */
  addJob: async (jobData) => {
    const companyMatch = companies.find(c => c.name.toLowerCase() === jobData.companyName.toLowerCase());
    
    // Create company if it doesn't exist
    const company = companyMatch || {
      id: `company-${Date.now()}`,
      name: jobData.companyName,
      location: `${jobData.location.city || ''}, ${jobData.location.state || ''}`.trim(),
    };
    
    if (!companyMatch) {
      companies.push(company);
    }
    
    const newJob = {
      id: `job-${Date.now()}`,
      title: jobData.title,
      company: company,
      location: jobData.location,
      employmentType: jobData.employmentType,
      description: jobData.description,
      requirements: [],
      responsibilities: [],
      tags: [],
      postedAt: new Date().toISOString(),
      applyUrl: jobData.applyUrl
    };
    
    jobs.unshift(newJob); // Add to the beginning of the array
    return simulateApiCall(newJob);
  },
  
  /**
   * Add multiple jobs at once (bulk upload)
   */
  addBulkJobs: async (jobsData) => {
    const newJobs = [];
    
    for (const jobData of jobsData) {
      const companyMatch = companies.find(c => c.name.toLowerCase() === jobData.companyName.toLowerCase());
      
      // Create company if it doesn't exist
      const company = companyMatch || {
        id: `company-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        name: jobData.companyName,
        location: `${jobData.location.city || ''}, ${jobData.location.state || ''}`.trim(),
      };
      
      if (!companyMatch) {
        companies.push(company);
      }
      
      const newJob = {
        id: `job-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        title: jobData.title,
        company: company,
        location: jobData.location,
        employmentType: jobData.employmentType,
        description: jobData.description,
        requirements: [],
        responsibilities: [],
        tags: [],
        postedAt: new Date().toISOString(),
        applyUrl: jobData.applyUrl
      };
      
      newJobs.push(newJob);
    }
    
    jobs = [...newJobs, ...jobs]; // Add new jobs to the beginning
    return simulateApiCall(newJobs);
  }
};
