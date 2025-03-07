
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { BriefcaseBusiness } from 'lucide-react';
import { JobFormFields } from './JobFormFields';
import { BulkUploadSheet } from './BulkUploadSheet';
import { 
  JobFormData, 
  initialFormData, 
  submitJobForm, 
  processCsvUpload 
} from '@/utils/jobFormUtils';

export const JobPostForm = () => {
  const [formData, setFormData] = useState<JobFormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [isFileUploadOpen, setIsFileUploadOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => {
        if (parent === 'location') {
          return {
            ...prev,
            location: {
              ...prev.location,
              [child]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
            }
          };
        }
        return prev;
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    await submitJobForm(formData, () => {
      setFormData(initialFormData);
    });
    
    setIsLoading(false);
  };

  const handleBulkUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    
    const success = await processCsvUpload(file, () => {
      setIsFileUploadOpen(false);
    });
    
    if (!success) {
      // The error toast is already shown in the processCsvUpload function
    }
    
    setIsLoading(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Post a New Job</h2>
        
        <BulkUploadSheet
          isOpen={isFileUploadOpen}
          onOpenChange={setIsFileUploadOpen}
          handleFileUpload={handleBulkUpload}
          isLoading={isLoading}
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <JobFormFields 
          formData={formData} 
          handleInputChange={handleInputChange} 
        />
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Post Job'}
        </Button>
      </form>
    </div>
  );
};
