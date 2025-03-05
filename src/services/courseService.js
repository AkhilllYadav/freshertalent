
// Mock data for courses
const coursesData = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    description: "Learn HTML, CSS, JavaScript, React and Node.js with practical projects.",
    instructor: "John Smith",
    category: "technical",
    thumbnail: "https://via.placeholder.com/640x360",
    url: "https://www.youtube.com/watch?v=example1",
    duration: "22 hours",
    likes: "45.2K",
    featured: true
  },
  {
    id: 2,
    title: "Effective Communication Skills",
    description: "Master the art of clear communication in professional settings.",
    instructor: "Emily Johnson",
    category: "soft",
    thumbnail: "https://via.placeholder.com/640x360",
    url: "https://www.youtube.com/watch?v=example2",
    duration: "4.5 hours",
    likes: "28.7K",
    featured: false
  },
  {
    id: 3,
    title: "Resume Building Masterclass",
    description: "Create a standout resume that gets you noticed by recruiters.",
    instructor: "Michael Brown",
    category: "career",
    thumbnail: "https://via.placeholder.com/640x360",
    url: "https://www.youtube.com/watch?v=example3",
    duration: "3 hours",
    likes: "31.5K",
    featured: true
  },
  {
    id: 4,
    title: "Advanced JavaScript Concepts",
    description: "Deep dive into advanced JS including closures, prototypes and async patterns.",
    instructor: "David Wilson",
    category: "technical",
    thumbnail: "https://via.placeholder.com/640x360",
    url: "https://www.youtube.com/watch?v=example4",
    duration: "8 hours",
    likes: "19.8K",
    featured: false
  },
  {
    id: 5,
    title: "Problem Solving and Critical Thinking",
    description: "Develop essential problem-solving skills for any workplace situation.",
    instructor: "Sarah Lee",
    category: "soft",
    thumbnail: "https://via.placeholder.com/640x360",
    url: "https://www.youtube.com/watch?v=example5",
    duration: "5.5 hours",
    likes: "22.3K",
    featured: false
  },
  {
    id: 6,
    title: "Interview Preparation Guide",
    description: "Comprehensive preparation for technical and behavioral interviews.",
    instructor: "James Anderson",
    category: "career",
    thumbnail: "https://via.placeholder.com/640x360",
    url: "https://www.youtube.com/watch?v=example6",
    duration: "6 hours",
    likes: "35.1K",
    featured: true
  }
];

// In a real application, this would interact with an API
export const getCourses = () => {
  return new Promise((resolve) => {
    // Simulating API delay
    setTimeout(() => {
      resolve(coursesData);
    }, 500);
  });
};

export const getCourseById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const course = coursesData.find(course => course.id === parseInt(id));
      if (course) {
        resolve(course);
      } else {
        reject(new Error('Course not found'));
      }
    }, 300);
  });
};

export const addCourse = (courseData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newCourse = {
        id: Math.max(...coursesData.map(c => c.id), 0) + 1,
        ...courseData,
        likes: "0",
      };
      coursesData.push(newCourse);
      resolve(newCourse);
    }, 300);
  });
};

export const updateCourse = (id, updatedData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = coursesData.findIndex(course => course.id === parseInt(id));
      if (index !== -1) {
        coursesData[index] = { ...coursesData[index], ...updatedData };
        resolve(coursesData[index]);
      } else {
        reject(new Error('Course not found'));
      }
    }, 300);
  });
};

export const deleteCourse = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = coursesData.findIndex(course => course.id === parseInt(id));
      if (index !== -1) {
        const deletedCourse = coursesData.splice(index, 1)[0];
        resolve(deletedCourse);
      } else {
        reject(new Error('Course not found'));
      }
    }, 300);
  });
};
