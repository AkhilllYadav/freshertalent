
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { CourseList } from '@/components/CourseList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const RecommendedCourses = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <Layout>
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Recommended Courses</h1>
        <p className="text-lg text-center max-w-3xl mx-auto mb-10">
          Enhance your skills with these carefully curated courses to boost your career prospects.
        </p>

        <Tabs defaultValue="all" className="max-w-6xl mx-auto" onValueChange={setActiveCategory}>
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="all">All Courses</TabsTrigger>
              <TabsTrigger value="technical">Technical Skills</TabsTrigger>
              <TabsTrigger value="soft">Soft Skills</TabsTrigger>
              <TabsTrigger value="career">Career Development</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all">
            <CourseList category="all" />
          </TabsContent>
          
          <TabsContent value="technical">
            <CourseList category="technical" />
          </TabsContent>
          
          <TabsContent value="soft">
            <CourseList category="soft" />
          </TabsContent>
          
          <TabsContent value="career">
            <CourseList category="career" />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default RecommendedCourses;
