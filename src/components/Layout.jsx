
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { cn } from '@/lib/utils';

export const Layout = ({ children, className, fullWidth = false }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className={cn(
        'flex-1 pt-24 pb-12',
        className
      )}>
        {fullWidth ? (
          children
        ) : (
          <div className="container max-w-7xl mx-auto px-6">
            {children}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};
