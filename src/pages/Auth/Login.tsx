import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Ghost, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '../../components/UI/Button';
import { Input } from '../../components/UI/Input';
import { Card } from '../../components/UI/Card';
import { useAuthStore } from '../../stores/authStore';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = (location.state as any)?.redirectTo || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate(redirectTo);
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card glass className="p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Ghost className="w-12 h-12 text-ecto-green" />
            </div>
            <h1 className="text-3xl font-heading font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-fog-gray">Sign in to continue your horror journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-blood-red/10 border border-blood-red/20 rounded-lg p-3"
              >
                <p className="text-blood-red text-sm">{error}</p>
              </motion.div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-fog-gray" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-charcoal border border-fog-gray/30 rounded-lg text-white placeholder-fog-gray/50 focus:outline-none focus:border-ecto-green focus:ring-2 focus:ring-ecto-green/20"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-fog-gray" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-3 bg-charcoal border border-fog-gray/30 rounded-lg text-white placeholder-fog-gray/50 focus:outline-none focus:border-ecto-green focus:ring-2 focus:ring-ecto-green/20"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-fog-gray hover:text-ecto-green"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-8 text-center space-y-4">
            <div className="text-fog-gray">
              Don't have an account?{' '}
              <Link to="/register" className="text-ecto-green hover:underline">
                Sign up here
              </Link>
            </div>
            
            <div className="border-t border-fog-gray/20 pt-4">
              <p className="text-fog-gray text-sm mb-2">Demo accounts:</p>
              <div className="text-xs text-fog-gray/70 space-y-1">
                <p>Customer: john@example.com / password</p>
                <p>Admin: admin@fadedsteps.com / password</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};