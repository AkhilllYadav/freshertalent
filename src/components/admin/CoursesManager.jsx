
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { getCourses, addCourse, updateCourse, deleteCourse } from '@/services/courseService';
import { PlusCircle, Pencil, Trash2, ExternalLink } from 'lucide-react';

export const CoursesManager = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructor: '',
    category: 'technical',
    url: '',
    thumbnail: '',
    duration: '',
    featured: false
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      instructor: '',
      category: 'technical',
      url: '',
      thumbnail: '',
      duration: '',
      featured: false
    });
    setIsEditing(false);
    setEditId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (value, field) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSwitchChange = (checked) => {
    setFormData({ ...formData, featured: checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title || !formData.description || !formData.url) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      if (isEditing) {
        await updateCourse(editId, formData);
        toast.success('Course updated successfully');
      } else {
        await addCourse(formData);
        toast.success('Course added successfully');
      }
      resetForm();
      fetchCourses();
    } catch (error) {
      console.error('Error saving course:', error);
      toast.error(isEditing ? 'Failed to update course' : 'Failed to add course');
    }
  };

  const handleEdit = (course) => {
    setFormData({
      title: course.title,
      description: course.description,
      instructor: course.instructor,
      category: course.category,
      url: course.url,
      thumbnail: course.thumbnail || '',
      duration: course.duration,
      featured: course.featured
    });
    setEditId(course.id);
    setIsEditing(true);
    
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await deleteCourse(id);
        toast.success('Course deleted successfully');
        fetchCourses();
      } catch (error) {
        console.error('Error deleting course:', error);
        toast.error('Failed to delete course');
      }
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        {isEditing ? 'Edit Course' : 'Add New Course'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title*</label>
            <Input 
              name="title" 
              value={formData.title} 
              onChange={handleInputChange} 
              placeholder="Course title"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Instructor*</label>
            <Input 
              name="instructor" 
              value={formData.instructor} 
              onChange={handleInputChange} 
              placeholder="Instructor name"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Description*</label>
          <Textarea 
            name="description" 
            value={formData.description} 
            onChange={handleInputChange} 
            placeholder="Course description"
            rows={3}
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Category*</label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleSelectChange(value, 'category')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technical">Technical Skills</SelectItem>
                <SelectItem value="soft">Soft Skills</SelectItem>
                <SelectItem value="career">Career Development</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Duration*</label>
            <Input 
              name="duration" 
              value={formData.duration} 
              onChange={handleInputChange} 
              placeholder="e.g., 4.5 hours"
              required
            />
          </div>
          
          <div className="flex items-end">
            <div className="flex items-center space-x-2">
              <Switch 
                checked={formData.featured} 
                onCheckedChange={handleSwitchChange}
              />
              <label className="text-sm font-medium">Featured Course</label>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">YouTube URL*</label>
            <Input 
              name="url" 
              value={formData.url} 
              onChange={handleInputChange} 
              placeholder="https://www.youtube.com/watch?v=..."
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Thumbnail URL</label>
            <Input 
              name="thumbnail" 
              value={formData.thumbnail} 
              onChange={handleInputChange} 
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>
        
        <div className="flex space-x-3">
          <Button type="submit">
            {isEditing ? 'Update Course' : 'Add Course'}
          </Button>
          {isEditing && (
            <Button type="button" variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          )}
        </div>
      </form>
      
      <h2 className="text-xl font-semibold mb-4">Existing Courses</h2>
      
      {loading ? (
        <div className="text-center py-10">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-2">Loading courses...</p>
        </div>
      ) : courses.length === 0 ? (
        <p className="text-center py-6 text-muted-foreground">No courses available</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="font-medium">{course.title}</TableCell>
                <TableCell className="capitalize">{course.category}</TableCell>
                <TableCell>{course.instructor}</TableCell>
                <TableCell>{course.featured ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => window.open(course.url, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleEdit(course)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDelete(course.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
