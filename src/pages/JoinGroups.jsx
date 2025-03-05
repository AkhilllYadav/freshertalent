
import React from 'react';
import { Layout } from '@/components/Layout';
import { CommunityGroups } from '@/components/CommunityGroups';

const JoinGroups = () => {
  return (
    <Layout>
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Join Our Community</h1>
        <p className="text-lg text-center max-w-3xl mx-auto mb-10">
          Connect with fellow job seekers and professionals. Share opportunities, tips, and support each other on your career journey.
        </p>
        <CommunityGroups />
      </div>
    </Layout>
  );
};

export default JoinGroups;
