
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { JobSearch } from '@/components/JobSearch';
import { JobCard } from '@/components/JobCard';
import { jobService } from '@/services/jobService';
import { Job } from '@/types/job';
import { Briefcase, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

interface SearchFilters {
  search?: string; 
  location?: string;
  remote?: boolean;
  tags?: string[];
}

const JobsPage = () => {
  const [searchParams] = useSearchParams();
  const isMobile = useIsMobile();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<SearchFilters>({
    search: searchParams.get('search') || undefined,
    location: searchParams.get('location') || undefined,
    remote: searchParams.get('remote') === 'true',
    tags: searchParams.get('tags') ? searchParams.get('tags').split(',') : undefined,
  });

  useEffect(() => {
    async function fetchJobs() {
      setIsLoading(true);
      try {
        const data = await jobService.getAllJobs(filters);
        setJobs(data);
      } catch (err) {
        console.error('Failed to fetch jobs', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchJobs();
  }, [filters]);

  // Update filters when URL params change
  useEffect(() => {
    setFilters({
      search: searchParams.get('search') || undefined,
      location: searchParams.get('location') || undefined,
      remote: searchParams.get('remote') === 'true',
      tags: searchParams.get('tags') ? searchParams.get('tags').split(',') : undefined,
    });
  }, [searchParams]);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Briefcase className="h-5 w-5 mr-2" />
            <h1 className="text-2xl font-semibold">Find Jobs</h1>
          </div>
          
          {/* Mobile filter button */}
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[85%]">
                <SheetHeader>
                  <SheetTitle>Job Filters</SheetTitle>
                  <SheetDescription>
                    Refine your job search with these filters
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-4">
                  <JobSearch onSearch={setFilters} />
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
        
        {/* Desktop search filters */}
        {!isMobile && <JobSearch onSearch={setFilters} />}
        
        <Separator className="my-6" />
        
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            {isLoading ? (
              'Loading jobs...'
            ) : (
              <>Found <span className="font-medium">{jobs.length}</span> jobs</>
            )}
          </p>
        </div>
        
        {isLoading ? (
          <div className="space-y-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-36 bg-muted/50 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : jobs.length > 0 ? (
          <div className="space-y-6">
            {jobs.map((job, index) => (
              <JobCard key={job.id} job={job} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center">
              <X className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-medium">No jobs found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Try adjusting your search filters or check back later for new opportunities.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default JobsPage;
