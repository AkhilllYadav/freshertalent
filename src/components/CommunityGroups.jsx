
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Send, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { getGroups } from '@/services/groupService';

export const CommunityGroups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        console.log('Fetching groups...');
        const groupsData = await getGroups();
        console.log('Fetched groups data:', groupsData);
        setGroups(groupsData);
      } catch (error) {
        console.error('Error fetching groups:', error);
        toast.error('Failed to load community groups');
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  const copyLinkToClipboard = (link) => {
    navigator.clipboard.writeText(link)
      .then(() => toast.success('Link copied to clipboard!'))
      .catch(() => toast.error('Failed to copy link'));
  };

  const joinGroup = (link) => {
    window.open(link, '_blank');
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
        <p className="mt-2">Loading community groups...</p>
      </div>
    );
  }

  if (groups.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-muted-foreground">No community groups found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
      {groups.map((group) => (
        <Card key={group.id} className="border-2 hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {group.type === 'whatsapp' ? (
                  <MessageSquare className="h-6 w-6 text-green-500" />
                ) : (
                  <Send className="h-6 w-6 text-blue-500" />
                )}
                <CardTitle>{group.title}</CardTitle>
              </div>
              <span className="text-sm bg-muted rounded-full px-3 py-1">
                {group.members} members
              </span>
            </div>
            <CardDescription>{group.description}</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm text-muted-foreground">
              Join this group to connect with other job seekers and access exclusive opportunities.
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="default" 
              onClick={() => joinGroup(group.link)}
              className={group.type === 'whatsapp' ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}
            >
              Join Group
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => copyLinkToClipboard(group.link)}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
