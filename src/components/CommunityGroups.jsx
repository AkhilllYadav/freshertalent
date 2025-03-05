
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Send, Share2 } from 'lucide-react';
import { toast } from 'sonner';

const communityGroups = [
  {
    id: 1,
    type: 'whatsapp',
    title: 'Job Seekers WhatsApp Group',
    description: 'Daily job updates, resume reviews, and interview preparation tips.',
    members: '2.5k+',
    link: 'https://chat.whatsapp.com/example',
    icon: <MessageSquare className="h-6 w-6 text-green-500" />
  },
  {
    id: 2,
    type: 'telegram',
    title: 'Career Opportunities Telegram',
    description: 'Exclusive job postings, networking opportunities, and career resources.',
    members: '5k+',
    link: 'https://t.me/example',
    icon: <Send className="h-6 w-6 text-blue-500" />
  },
  {
    id: 3,
    type: 'whatsapp',
    title: 'Tech Jobs Community',
    description: 'For IT professionals and tech job seekers. Industry insights and job alerts.',
    members: '1.8k+',
    link: 'https://chat.whatsapp.com/tech-example',
    icon: <MessageSquare className="h-6 w-6 text-green-500" />
  },
  {
    id: 4,
    type: 'telegram',
    title: 'Remote Work Opportunities',
    description: 'Focus on remote and flexible work options across all industries.',
    members: '3.2k+',
    link: 'https://t.me/remote-example',
    icon: <Send className="h-6 w-6 text-blue-500" />
  }
];

export const CommunityGroups = () => {
  const copyLinkToClipboard = (link) => {
    navigator.clipboard.writeText(link)
      .then(() => toast.success('Link copied to clipboard!'))
      .catch(() => toast.error('Failed to copy link'));
  };

  const joinGroup = (link) => {
    window.open(link, '_blank');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
      {communityGroups.map((group) => (
        <Card key={group.id} className="border-2 hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {group.icon}
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
