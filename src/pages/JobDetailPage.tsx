
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { jobService } from '@/services/jobService';
import { Job } from '@/types/job';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { formatDistanceToNow } from 'date-fns';
import { ArrowLeft, MapPin, Building, Clock, DollarSign, Briefcase, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

const JobDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchJobDetails() {
      if (!id) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const jobData = await jobService.getJobById(id);
        if (!jobData) {
          setError('Job not found');
          return;
        }
        setJob(jobData);
      } catch (err) {
        console.error('Failed to fetch job details', err);
        setError('Failed to load job details');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchJobDetails();
  }, [id]);

  const handleApply = () => {
    if (!job) return;
    
    // Open the application URL in a new tab
    window.open(job.applyUrl, '_blank');
    
    // Show a toast notification
    toast.success('Redirecting to application page', {
      description: `Applying for ${job.title} at ${job.company.name}`
    });
  };

  const formatSalary = (salary?: Job['salary']) => {
    if (!salary) return 'Salary not specified';
    
    const { min, max, currency, period } = salary;
    const currencySymbol = currency === 'USD' ? '$' : currency;
    
    if (min && max) {
      return `${currencySymbol}${min.toLocaleString()} - ${currencySymbol}${max.toLocaleString()} per ${period.replace('ly', '')}`;
    } else if (min) {
      return `From ${currencySymbol}${min.toLocaleString()} per ${period.replace('ly', '')}`;
    } else if (max) {
      return `Up to ${currencySymbol}${max.toLocaleString()} per ${period.replace('ly', '')}`;
    }
    
    return 'Salary not specified';
  };

  return (
    <Layout>
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="flex items-center text-muted-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to jobs
        </Button>
      </div>
      
      {isLoading ? (
        <div className="space-y-4">
          <div className="h-10 bg-muted/50 rounded-md w-3/4 animate-pulse"></div>
          <div className="h-5 bg-muted/50 rounded-md w-1/2 animate-pulse"></div>
          <div className="h-40 bg-muted/50 rounded-md animate-pulse mt-8"></div>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-destructive">{error}</h3>
          <p className="mt-2 text-muted-foreground">Unable to load job details</p>
          <Link to="/jobs">
            <Button variant="outline" className="mt-4">
              Browse all jobs
            </Button>
          </Link>
        </div>
      ) : job ? (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-8">
            {/* Job Header */}
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{job.title}</h1>
              <div className="flex items-center mt-2">
                <span className="text-lg">{job.company.name}</span>
                {job.employmentType && (
                  <>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <Badge variant="outline" className="capitalize">
                      {job.employmentType.replace('-', ' ')}
                    </Badge>
                  </>
                )}
              </div>
              
              <div className="mt-4 flex flex-wrap gap-6 text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>
                    {job.location.remote ? 'Remote' : [job.location.city, job.location.state, job.location.country].filter(Boolean).join(', ')}
                  </span>
                </div>
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-2" />
                  <span>{job.company.name}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Posted {formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}</span>
                </div>
                {job.salary && (
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2" />
                    <span>{formatSalary(job.salary)}</span>
                  </div>
                )}
              </div>
              
              {job.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.tags.map(tag => (
                    <Badge key={tag.id} variant="secondary">
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            
            <Separator />
            
            {/* Job Description */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <div className="prose prose-neutral max-w-none">
                <p>{job.description}</p>
              </div>
            </div>
            
            {/* Responsibilities */}
            {job.responsibilities.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Responsibilities</h2>
                <ul className="list-disc pl-5 space-y-2">
                  {job.responsibilities.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Requirements */}
            {job.requirements.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                <ul className="list-disc pl-5 space-y-2">
                  {job.requirements.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="rounded-lg border bg-card p-6 sticky top-24">
              <h3 className="font-medium mb-4">Job Summary</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <Briefcase className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                  <div>
                    <span className="text-muted-foreground">Job Type:</span>
                    <p className="font-medium capitalize">{job.employmentType.replace('-', ' ')}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                  <div>
                    <span className="text-muted-foreground">Location:</span>
                    <p className="font-medium">
                      {job.location.remote ? 'Remote' : [job.location.city, job.location.state, job.location.country].filter(Boolean).join(', ')}
                    </p>
                  </div>
                </li>
                {job.salary && (
                  <li className="flex items-start">
                    <DollarSign className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                    <div>
                      <span className="text-muted-foreground">Salary:</span>
                      <p className="font-medium">{formatSalary(job.salary)}</p>
                    </div>
                  </li>
                )}
                <li className="flex items-start">
                  <Clock className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                  <div>
                    <span className="text-muted-foreground">Posted:</span>
                    <p className="font-medium">{formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}</p>
                  </div>
                </li>
              </ul>
              
              <div className="mt-6">
                <Button onClick={handleApply} className="w-full">
                  Apply Now <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  You'll be redirected to the company's application page
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </Layout>
  );
};

export default JobDetailPage;
