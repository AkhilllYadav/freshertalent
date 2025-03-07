
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Upload } from 'lucide-react';

interface BulkUploadSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
}

export const BulkUploadSheet: React.FC<BulkUploadSheetProps> = ({
  isOpen,
  onOpenChange,
  handleFileUpload,
  isLoading
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
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
            onChange={handleFileUpload}
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
