
import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { JobCard } from '@/components/JobCard';
import { jobService } from '@/services/jobService';
import { Job } from '@/types/job';
import { BriefcaseBusiness, TrendingUp, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Index = () => {
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const [featured, recent] = await Promise.all([
          jobService.getFeaturedJobs(),
          jobService.getRecentJobs()
        ]);
        
        setFeaturedJobs(featured);
        setRecentJobs(recent.slice(0, 4)); // Limit to 4 recent jobs
      } catch (err) {
        console.error('Failed to fetch initial data', err);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchInitialData();
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Find Your Perfect Career Opportunity
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">
              Discover job openings curated for professionals like you, with a seamless application experience.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/jobs">
                <Button size="lg" className="w-full sm:w-auto">
                  Browse All Jobs
                </Button>
              </Link>
              <Link to="/jobs">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <BriefcaseBusiness className="mr-2 h-4 w-4" />
                  Featured Opportunities
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      {(isLoading || featuredJobs.length > 0) && (
        <section className="py-12 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-primary" />
                <h2 className="text-2xl font-semibold tracking-tight">Featured Opportunities</h2>
              </div>
              <Link to="/jobs" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                View all jobs
              </Link>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="h-40 bg-muted/50 rounded-lg animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredJobs.map((job, index) => (
                  <JobCard key={job.id} job={job} index={index} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Recent Jobs Section */}
      {(isLoading || recentJobs.length > 0) && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                <h2 className="text-2xl font-semibold tracking-tight">Recently Posted</h2>
              </div>
              <Link to="/jobs" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                View all jobs
              </Link>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-36 bg-muted/50 rounded-lg animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recentJobs.map((job, index) => (
                  <JobCard key={job.id} job={job} index={index} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold tracking-tight">Ready to find your next opportunity?</h2>
          <p className="mt-4 text-primary-foreground/80">
            Browse our curated list of job opportunities and take the next step in your career journey.
          </p>
          <div className="mt-10">
            <Link to="/jobs">
              <Button size="lg" variant="secondary" className="font-medium">
                Explore All Jobs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
