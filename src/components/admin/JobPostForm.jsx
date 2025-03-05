
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { addJob, getJobs } from '@/services/jobService';

export const JobPostForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    type: 'Full-time',
    description: '',
    requirements: '',
    contactEmail: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSelectChange = (value) => {
    setFormData({
      ...formData,
      type: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Convert requirements string to array
      const jobData = {
        ...formData,
        requirements: formData.requirements.split('\n').filter(req => req.trim() !== '')
      };

      await addJob(jobData);
      
      setFormData({
        title: '',
        company: '',
        location: '',
        salary: '',
        type: 'Full-time',
        description: '',
        requirements: '',
        contactEmail: ''
      });
      
      toast.success('Job posted successfully!');
    } catch (error) {
      console.error('Error posting job:', error);
      toast.error('Failed to post job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Post a New Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Job Title*</label>
            <Input 
              name="title" 
              value={formData.title} 
              onChange={handleInputChange} 
              placeholder="e.g., Frontend Developer"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Company*</label>
            <Input 
              name="company" 
              value={formData.company} 
              onChange={handleInputChange} 
              placeholder="e.g., Acme Inc."
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Location*</label>
            <Input 
              name="location" 
              value={formData.location} 
              onChange={handleInputChange} 
              placeholder="e.g., Remote, New York"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Salary (optional)</label>
            <Input 
              name="salary" 
              value={formData.salary} 
              onChange={handleInputChange} 
              placeholder="e.g., $80,000 - $100,000"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Job Type*</label>
            <Select 
              value={formData.type} 
              onValueChange={handleSelectChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Freelance">Freelance</SelectItem>
                <SelectItem value="Internship">Internship</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Job Description*</label>
          <Textarea 
            name="description" 
            value={formData.description} 
            onChange={handleInputChange} 
            placeholder="Enter job description..."
            rows={5}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Requirements* (one per line)</label>
          <Textarea 
            name="requirements" 
            value={formData.requirements} 
            onChange={handleInputChange} 
            placeholder="Enter job requirements, one per line..."
            rows={5}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Contact Email*</label>
          <Input 
            name="contactEmail" 
            type="email"
            value={formData.contactEmail} 
            onChange={handleInputChange} 
            placeholder="contact@company.com"
            required
          />
        </div>
        
        <Button type="submit" disabled={loading}>
          {loading ? 'Posting...' : 'Post Job'}
        </Button>
      </form>
    </div>
  );
};
