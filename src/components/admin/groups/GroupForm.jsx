
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const GroupForm = ({ 
  formData, 
  setFormData, 
  isEditing, 
  handleInputChange, 
  handleSelectChange,
  handleSubmit,
  resetForm 
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Group Title*</label>
          <Input 
            name="title" 
            value={formData.title} 
            onChange={handleInputChange} 
            placeholder="Group title"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Group Type*</label>
          <Select
            value={formData.type}
            onValueChange={handleSelectChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="whatsapp">WhatsApp</SelectItem>
              <SelectItem value="telegram">Telegram</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Description*</label>
        <Textarea 
          name="description" 
          value={formData.description} 
          onChange={handleInputChange} 
          placeholder="Group description"
          rows={3}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Group Link*</label>
          <Input 
            name="link" 
            value={formData.link} 
            onChange={handleInputChange} 
            placeholder={formData.type === 'whatsapp' ? 'https://chat.whatsapp.com/...' : 'https://t.me/...'}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Members*</label>
          <Input 
            name="members" 
            value={formData.members} 
            onChange={handleInputChange} 
            placeholder="e.g., 1.5k+"
            required
          />
        </div>
      </div>
      
      <div className="flex space-x-3">
        <Button type="submit">
          {isEditing ? 'Update Group' : 'Add Group'}
        </Button>
        {isEditing && (
          <Button type="button" variant="outline" onClick={resetForm}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default GroupForm;
