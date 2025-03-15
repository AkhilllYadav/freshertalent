
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { jobService } from '@/services/jobService';
import { toast } from 'sonner';
import { BriefcaseBusiness } from 'lucide-react';
import { JobFormFields } from './JobFormFields';
import { BulkUploadSheet } from './BulkUploadSheet';

const initialFormData = {
  title: '',
  companyName: '',
  location: {
    city: '',
    state: '',
    country: 'USA',
    remote: false,
  },
  description: '',
  employmentType: 'full-time',
  applyUrl: '',
};

export const JobPostForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [isFileUploadOpen, setIsFileUploadOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // Add a refresh key to force re-render

  // Force a refresh when the component mounts
  useEffect(() => {
    console.log('JobPostForm refreshed');
    // Force re-render by incrementing the refresh key
    setRefreshKey(prevKey => prevKey + 1);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => {
        if (parent === 'location') {
          return {
            ...prev,
            location: {
              ...prev.location,
              [child]: type === 'checkbox' ? e.target.checked : value
            }
          };
        }
        return prev;
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? e.target.checked : value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newJob = {
      title: formData.title,
      companyName: formData.companyName,
      location: formData.location,
      description: formData.description,
      employmentType: formData.employmentType,
      applyUrl: formData.applyUrl
    };

    jobService.addJob(newJob)
      .then(() => {
        toast.success('Job posted successfully!');
        setFormData(initialFormData);
      })
      .catch(error => {
        console.error('Error posting job:', error);
        toast.error('Failed to post job. Please try again.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  
  return (
    <div className="space-y-6" key={refreshKey}>
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h2 className="text-xl font-semibold">Post a New Job</h2>
        <BulkUploadSheet 
          isOpen={isFileUploadOpen}
          setIsOpen={setIsFileUploadOpen}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <JobFormFields
          formData={formData}
          handleInputChange={handleInputChange}
        />
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Post Job'}
        </Button>
      </form>
    </div>
  );
};
