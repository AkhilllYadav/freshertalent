
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { jobService } from '@/services/jobService';
import { toast } from 'sonner';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { BriefcaseBusiness, Upload } from 'lucide-react';

type JobFormData = {
  title: string;
  companyName: string;
  location: {
    city: string;
    state: string;
    country: string;
    remote: boolean;
  };
  description: string;
  employmentType: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship';
};

const initialFormData: JobFormData = {
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
};

export const JobPostForm = () => {
  const [formData, setFormData] = useState<JobFormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [isFileUploadOpen, setIsFileUploadOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof JobFormData],
          [child]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // In a real app, this would connect to a real backend
    setTimeout(() => {
      // Mock response - in real app would submit to API
      console.log('Posting job:', formData);
      toast.success('Job posted successfully!');
      setFormData(initialFormData);
      setIsLoading(false);
    }, 1000);
  };

  const handleBulkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // In a real app, this would process and upload the file
    // For now, we'll just show a success message after a delay
    setIsLoading(true);
    setTimeout(() => {
      toast.success(`Bulk upload of ${file.name} successful!`);
      setIsLoading(false);
      setIsFileUploadOpen(false);
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Post a New Job</h2>
        
        <Sheet open={isFileUploadOpen} onOpenChange={setIsFileUploadOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Upload size={16} />
              Bulk Upload
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Upload Jobs in Bulk</SheetTitle>
            </SheetHeader>
            <div className="py-6">
              <p className="text-muted-foreground mb-4">
                Upload a CSV or Excel file with your job listings. Each row should contain one job posting.
              </p>
              <Input 
                type="file" 
                accept=".csv,.xlsx,.xls" 
                onChange={handleBulkUpload}
                disabled={isLoading}
              />
              <div className="mt-6">
                <p className="text-sm font-medium mb-2">Template Format:</p>
                <pre className="bg-muted p-3 rounded-md text-xs overflow-auto">
                  Title,Company,City,State,Country,Remote,Description,EmploymentType
                </pre>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Job Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location.city">City</Label>
            <Input
              id="location.city"
              name="location.city"
              value={formData.location.city}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location.state">State</Label>
            <Input
              id="location.state"
              name="location.state"
              value={formData.location.state}
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location.country">Country</Label>
            <Input
              id="location.country"
              name="location.country"
              value={formData.location.country}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="flex items-center space-x-2 pt-6">
            <input
              type="checkbox"
              id="location.remote"
              name="location.remote"
              checked={formData.location.remote}
              onChange={handleInputChange}
              className="h-4 w-4"
            />
            <Label htmlFor="location.remote">Remote Position</Label>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="employmentType">Employment Type</Label>
          <select
            id="employmentType"
            name="employmentType"
            value={formData.employmentType}
            onChange={handleInputChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            required
          >
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="freelance">Freelance</option>
            <option value="internship">Internship</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Job Description</Label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={6}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            required
          />
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Post Job'}
        </Button>
      </form>
    </div>
  );
};
