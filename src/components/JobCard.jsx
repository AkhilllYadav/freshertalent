
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { BriefcaseBusiness, MapPin, Clock, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const formatSalary = (salary) => {
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

export const JobCard = ({ job, index = 0 }) => {
  const postedDate = new Date(job.postedAt);
  const timeAgo = formatDistanceToNow(postedDate, { addSuffix: true });
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link to={`/jobs/${job.id}`} className="block group">
        <Card className={cn(
          "overflow-hidden transition-all duration-200 hover:shadow-md border",
          job.featured ? "border-primary/20" : "border-border"
        )}>
          {job.featured && (
            <div className="bg-primary/10 py-1 px-3">
              <p className="text-xs font-medium text-primary">Featured Position</p>
            </div>
          )}
          <CardContent className={cn(
            "p-5",
            job.featured ? "pt-4" : ""
          )}>
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center mr-3">
                  <BriefcaseBusiness className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-medium text-lg group-hover:text-primary transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{job.company.name}</p>
                </div>
              </div>
              <div className="hidden sm:block">
                {job.employmentType && (
                  <Badge variant="outline" className="capitalize">
                    {job.employmentType.replace('-', ' ')}
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span>
                  {job.location.remote ? 'Remote' : [job.location.city, job.location.state].filter(Boolean).join(', ')}
                </span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                <span>Posted {timeAgo}</span>
              </div>
            </div>
            
            {job.salary && (
              <div className="mt-3 flex items-center text-sm">
                <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>{formatSalary(job.salary)}</span>
              </div>
            )}
            
            {job.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {job.tags.map(tag => (
                  <Badge key={tag.id} variant="secondary" className="text-xs">
                    {tag.name}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};
