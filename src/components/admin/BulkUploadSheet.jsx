
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { toast } from 'sonner';
import { jobService } from '@/services/jobService';

export const BulkUploadSheet = ({ isOpen, setIsOpen, isLoading, setIsLoading }) => {
  
  const handleBulkUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const csvContent = event.target?.result;
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
            employmentType: columns[7].trim(),
            applyUrl: columns[8]?.trim() || ''
          };
          
          jobsToAdd.push(job);
        }
        
        if (jobsToAdd.length > 0) {
          jobService.addBulkJobs(jobsToAdd)
            .then(() => {
              toast.success(`Successfully uploaded ${jobsToAdd.length} jobs!`);
              setIsOpen(false);
            })
            .catch(error => {
              console.error('Error uploading jobs:', error);
              toast.error('Failed to upload jobs. Please try again.');
            })
            .finally(() => {
              setIsLoading(false);
            });
        } else {
          toast.error('No valid jobs found in the uploaded file.');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error parsing CSV file:', error);
        toast.error('Failed to parse uploaded file. Please check the format.');
        setIsLoading(false);
      }
    };
    
    reader.onerror = () => {
      toast.error('Failed to read the uploaded file.');
      setIsLoading(false);
    };
    
    reader.readAsText(file);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
              Title,Company,City,State,Country,Remote,Description,EmploymentType,ApplyUrl
            </pre>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
