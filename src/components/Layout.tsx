
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export const Layout = ({ children, className, fullWidth = false }: LayoutProps) => {
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
