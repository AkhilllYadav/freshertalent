
import { toast } from 'sonner';
import { jobService } from '@/services/jobService';

export type JobLocation = {
  city: string;
  state: string;
  country: string;
  remote: boolean;
};

export type JobFormData = {
  title: string;
  companyName: string;
  location: JobLocation;
  description: string;
  employmentType: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship';
  applyUrl: string;
};

export const initialFormData: JobFormData = {
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

export const submitJobForm = async (formData: JobFormData, onSuccess: () => void) => {
  const newJob = {
    title: formData.title,
    companyName: formData.companyName,
    location: formData.location,
    description: formData.description,
    employmentType: formData.employmentType,
    applyUrl: formData.applyUrl
  };

  try {
    await jobService.addJob(newJob);
    toast.success('Job posted successfully!');
    onSuccess();
    return true;
  } catch (error) {
    console.error('Error posting job:', error);
    toast.error('Failed to post job. Please try again.');
    return false;
  }
};

export const processCsvUpload = async (file: File, onSuccess: () => void): Promise<boolean> => {
  try {
    const csvContent = await readFileAsText(file);
    const rows = csvContent.split('\n');
    
    const startRow = rows[0].includes('Title,Company') ? 1 : 0;
    
    const jobsToAdd = [];
    
    for (let i = startRow; i < rows.length; i++) {
      const row = rows[i].trim();
      if (!row) continue;
      
      const columns = row.split(',');
      if (columns.length < 8) continue;
      
      const job = {
        title: columns[0].trim(),
        companyName: columns[1].trim(),
        location: {
          city: columns[2].trim(),
          state: columns[3].trim(),
          country: columns[4].trim() || 'USA',
          remote: columns[5].trim().toLowerCase() === 'true'
        },
        description: columns[6].trim(),
        employmentType: columns[7].trim() as 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship',
        applyUrl: columns[8]?.trim() || ''
      };
      
      jobsToAdd.push(job);
    }
    
    if (jobsToAdd.length > 0) {
      await jobService.addBulkJobs(jobsToAdd);
      toast.success(`Successfully uploaded ${jobsToAdd.length} jobs!`);
      onSuccess();
      return true;
    } else {
      toast.error('No valid jobs found in the uploaded file.');
      return false;
    }
  } catch (error) {
    console.error('Error processing CSV file:', error);
    toast.error('Failed to parse uploaded file. Please check the format.');
    return false;
  }
};

const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        resolve(event.target.result as string);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};
