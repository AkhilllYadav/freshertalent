
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { BriefcaseBusiness, Home, Search, MenuIcon, X, Shield, BookOpen, Users } from 'lucide-react';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check admin status on navigation changes
  useEffect(() => {
    const checkAdminStatus = () => {
      const adminStatus = localStorage.getItem('isAdminLoggedIn') === 'true';
      setIsAdmin(adminStatus);
    };
    
    checkAdminStatus();
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { href: '/', label: 'Home', icon: <Home className="h-4 w-4 mr-2" /> },
    { href: '/jobs', label: 'Jobs', icon: <BriefcaseBusiness className="h-4 w-4 mr-2" /> },
    { href: '/courses', label: 'Courses', icon: <BookOpen className="h-4 w-4 mr-2" /> },
    { href: '/community', label: 'Community', icon: <Users className="h-4 w-4 mr-2" /> },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 px-6 transition-all duration-300',
        isScrolled ? 'py-3 backdrop-blur-md bg-background/80 border-b' : 'py-5'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-semibold tracking-tight transition-opacity hover:opacity-80"
        >
          JobSeekHaven
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              to={item.href}
              className={cn(
                'px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center',
                location.pathname === item.href 
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                  : 'text-foreground/80 hover:text-foreground hover:bg-accent'
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
          <Link to="/jobs">
            <Button variant="outline" size="sm" className="ml-2 flex items-center">
              <Search className="h-4 w-4 mr-2" />
              Find Jobs
            </Button>
          </Link>
          {isAdmin && (
            <Link to="/admin/dashboard">
              <Button 
                variant="default"
                size="sm" 
                className="ml-2 flex items-center"
              >
                <Shield className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden" 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={cn(
          'fixed inset-0 top-[57px] z-40 bg-background md:hidden transition-transform duration-300 ease-in-out',
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <nav className="flex flex-col p-6 space-y-4">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              to={item.href}
              className={cn(
                'px-4 py-3 rounded-md text-base font-medium transition-colors flex items-center',
                location.pathname === item.href 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-accent'
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
          <Link to="/jobs" className="mt-4">
            <Button className="w-full justify-start">
              <Search className="h-4 w-4 mr-2" />
              Find Jobs
            </Button>
          </Link>
          {isAdmin && (
            <Link to="/admin/dashboard" className="mt-1">
              <Button 
                variant="default"
                className="w-full justify-start"
              >
                <Shield className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};
