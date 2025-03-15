
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="bg-muted/50 border rounded-full h-24 w-24 flex items-center justify-center mb-6">
          <span className="text-5xl font-light">404</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">Page not found</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-md">
          Sorry, we couldn't find the page you're looking for. It might have been removed or doesn't exist.
        </p>
        <div className="flex gap-4">
          <Link to="/">
            <Button>Go to Home</Button>
          </Link>
          <Link to="/jobs">
            <Button variant="outline">Browse Jobs</Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
