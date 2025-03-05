
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { JobPostForm } from '@/components/admin/JobPostForm';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GroupsManager } from '@/components/admin/GroupsManager';
import { CoursesManager } from '@/components/admin/CoursesManager';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('jobs');
  
  useEffect(() => {
    // Check if admin is logged in
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    if (!isLoggedIn) {
      toast.error('Please login as admin first');
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    toast.success('Logged out successfully');
    navigate('/admin');
  };

  return (
    <Layout>
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="jobs">Manage Jobs</TabsTrigger>
          <TabsTrigger value="courses">Manage Courses</TabsTrigger>
          <TabsTrigger value="groups">Manage Groups</TabsTrigger>
        </TabsList>
        
        <TabsContent value="jobs" className="mt-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <JobPostForm />
          </div>
        </TabsContent>
        
        <TabsContent value="courses" className="mt-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <CoursesManager />
          </div>
        </TabsContent>
        
        <TabsContent value="groups" className="mt-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <GroupsManager />
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default AdminDashboard;
