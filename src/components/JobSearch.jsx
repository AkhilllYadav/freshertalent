
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Search, MapPin, X } from 'lucide-react';
import { jobService } from '@/services/jobService';
import { motion } from 'framer-motion';

export const JobSearch = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [remote, setRemote] = useState(searchParams.get('remote') === 'true');
  const [selectedTags, setSelectedTags] = useState(
    searchParams.get('tags') ? searchParams.get('tags').split(',') : []
  );
  const [allTags, setAllTags] = useState([]);
  const [tagsLoading, setTagsLoading] = useState(true);
  const [showTagsDropdown, setShowTagsDropdown] = useState(false);

  useEffect(() => {
    async function fetchTags() {
      try {
        const tags = await jobService.getAllTags();
        setAllTags(tags);
      } catch (err) {
        console.error('Failed to fetch tags', err);
      } finally {
        setTagsLoading(false);
      }
    }
    
    fetchTags();
  }, []);

  useEffect(() => {
    // Update state from URL params when they change
    setSearch(searchParams.get('search') || '');
    setLocation(searchParams.get('location') || '');
    setRemote(searchParams.get('remote') === 'true');
    setSelectedTags(searchParams.get('tags') ? searchParams.get('tags').split(',') : []);
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Update URL parameters
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (location) params.set('location', location);
    if (remote) params.set('remote', 'true');
    if (selectedTags.length > 0) params.set('tags', selectedTags.join(','));
    
    setSearchParams(params);
    
    // Call the search callback
    onSearch({
      search: search || undefined,
      location: location || undefined,
      remote: remote || undefined,
      tags: selectedTags.length > 0 ? selectedTags : undefined,
    });
  };

  const handleTagToggle = (tagId) => {
    setSelectedTags(prev => 
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleClearAll = () => {
    setSearch('');
    setLocation('');
    setRemote(false);
    setSelectedTags([]);
    setSearchParams(new URLSearchParams());
    onSearch({});
  };

  return (
    <div className="bg-card shadow-sm border rounded-lg">
      <form onSubmit={handleSubmit} className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Job title, keyword, or company"
                className="pl-9"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="City, state, or country"
                className="pl-9"
                value={location}
                onChange={e => setLocation(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <Button type="submit" className="w-full">
              Search
            </Button>
          </div>
        </div>
        
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remote"
              checked={remote}
              onCheckedChange={() => setRemote(!remote)}
            />
            <Label htmlFor="remote" className="text-sm font-normal cursor-pointer">
              Remote jobs only
            </Label>
          </div>
          
          <div className="relative">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowTagsDropdown(!showTagsDropdown)}
              className="text-sm"
            >
              Skills & Technologies
              <span className="ml-1">
                {selectedTags.length > 0 && `(${selectedTags.length})`}
              </span>
            </Button>
            
            {showTagsDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute z-10 mt-1 w-64 max-h-60 overflow-auto bg-card border rounded-md shadow-md p-2"
              >
                {tagsLoading ? (
                  <div className="p-2 text-sm text-center text-muted-foreground">
                    Loading tags...
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-1">
                    {allTags.map(tag => (
                      <div key={tag.id} className="flex items-center space-x-2 p-1.5">
                        <Checkbox
                          id={`tag-${tag.id}`}
                          checked={selectedTags.includes(tag.id)}
                          onCheckedChange={() => handleTagToggle(tag.id)}
                        />
                        <Label 
                          htmlFor={`tag-${tag.id}`} 
                          className="text-sm font-normal cursor-pointer"
                        >
                          {tag.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </div>
          
          {(search || location || remote || selectedTags.length > 0) && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
              className="text-sm text-muted-foreground"
            >
              <X className="h-3 w-3 mr-1" />
              Clear all
            </Button>
          )}
        </div>
      </form>
      
      {selectedTags.length > 0 && (
        <div className="px-4 pb-4 -mt-1">
          <div className="flex flex-wrap gap-2">
            {selectedTags.map(tagId => {
              const tag = allTags.find(t => t.id === tagId);
              return tag ? (
                <div key={tag.id} className="inline-flex items-center bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-xs">
                  {tag.name}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => handleTagToggle(tag.id)}
                  />
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};
