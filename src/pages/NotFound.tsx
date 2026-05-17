import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Decorative Offgrid Blur Spheres */}
      <div className="absolute top-[-10%] left-[-10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-gray-200/40 filter blur-[80px] sm:blur-[120px] opacity-70 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-gray-200/40 filter blur-[80px] sm:blur-[120px] opacity-70 pointer-events-none" />

      <div className="text-center relative z-10 max-w-md mx-auto space-y-6">
        {/* Quiet Muted Gray 404 Title */}
        <h1 className="text-[120px] sm:text-[160px] font-extrabold text-gray-300 leading-none tracking-tighter select-none">
          404
        </h1>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-500">
            Lost in Space?
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        <div className="pt-4 max-w-[220px] mx-auto">
          <Button
            variant="secondary"
            onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
            className="w-full transition-all duration-300 font-medium rounded-full py-4 px-6"
          >
            {isAuthenticated ? 'Go to Dashboard' : 'Back to Login'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
