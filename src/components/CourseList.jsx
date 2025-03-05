
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, ThumbsUp, Award, Clock } from 'lucide-react';
import { getCourses } from '@/services/courseService';

export const CourseList = ({ category }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const coursesData = await getCourses();
        
        if (category === 'all') {
          setCourses(coursesData);
        } else {
          setCourses(coursesData.filter(course => course.category === category));
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [category]);

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
        <p className="mt-2">Loading courses...</p>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-muted-foreground">No courses found in this category</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <Card key={course.id} className="flex flex-col h-full border hover:shadow-md transition-shadow">
          <div className="relative">
            <div className="aspect-video overflow-hidden rounded-t-lg">
              <img 
                src={course.thumbnail || 'https://via.placeholder.com/640x360'} 
                alt={course.title}
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>
            {course.featured && (
              <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium flex items-center">
                <Award className="h-3 w-3 mr-1" />
                Featured
              </div>
            )}
          </div>
          
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{course.title}</CardTitle>
            </div>
            <CardDescription className="line-clamp-2 h-10">{course.description}</CardDescription>
          </CardHeader>
          
          <CardContent className="pb-3 flex-grow">
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <Clock className="h-4 w-4 mr-1" />
              <span>{course.duration}</span>
              <span className="mx-2">•</span>
              <ThumbsUp className="h-4 w-4 mr-1" />
              <span>{course.likes}</span>
            </div>
            <div className="text-sm">
              <span className="font-medium">Instructor:</span> {course.instructor}
            </div>
          </CardContent>
          
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={() => window.open(course.url, '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Watch on YouTube
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
