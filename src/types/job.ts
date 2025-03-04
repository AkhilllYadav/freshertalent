
export interface Company {
  id: string;
  name: string;
  logo?: string;
  website?: string;
  location?: string;
}

export interface JobLocation {
  city?: string;
  state?: string;
  country: string;
  remote: boolean;
}

export interface JobTag {
  id: string;
  name: string;
}

export interface Job {
  id: string;
  title: string;
  company: Company;
  location: JobLocation;
  salary?: {
    min?: number;
    max?: number;
    currency: string;
    period: 'hourly' | 'monthly' | 'yearly';
  };
  employmentType: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship';
  description: string;
  requirements: string[];
  responsibilities: string[];
  tags: JobTag[];
  postedAt: string;
  applyUrl: string;
  featured?: boolean;
}
