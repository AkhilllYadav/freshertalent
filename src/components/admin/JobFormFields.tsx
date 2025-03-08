
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type JobFormFieldsProps = {
  formData: {
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
    applyUrl: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
};

export const JobFormFields = ({ formData, handleInputChange }: JobFormFieldsProps) => {
  return (
    <>
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
      
      <div className="space-y-2">
        <Label htmlFor="applyUrl">Application Link URL</Label>
        <Input
          id="applyUrl"
          name="applyUrl"
          type="url"
          value={formData.applyUrl}
          onChange={handleInputChange}
          placeholder="https://example.com/apply"
          required
        />
        <p className="text-xs text-muted-foreground">
          External link where candidates can apply for this position
        </p>
      </div>
    </>
  );
};
