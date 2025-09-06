import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Ghost, User, Mail, Lock, Eye, EyeOff, Key } from 'lucide-react';
import { Button } from '../../components/UI/Button';
import { Card } from '../../components/UI/Card';
import { useAuthStore } from '../../stores/authStore';

export const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'CUSTOMER' as 'CUSTOMER' | 'ADMIN',
    inviteCode: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuthStore();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formData.role === 'ADMIN' && !formData.inviteCode) {
      newErrors.inviteCode = 'Admin invite code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const success = await register(
        formData.name,
        formData.email,
        formData.password,
        formData.role,
        formData.inviteCode || undefined
      );

      if (success) {
        navigate(formData.role === 'ADMIN' ? '/admin' : '/dashboard');
      } else {
        if (formData.role === 'ADMIN') {
          setErrors({ inviteCode: 'Invalid admin invite code' });
        } else {
          setErrors({ email: 'Email already exists' });
        }
      }
    } catch (err) {
      setErrors({ general: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
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
              <Ghost className="w-12 h-12 text-ecto-green animate-pulse" />
            </div>
            <h1 className="text-3xl font-heading font-bold text-white mb-2">Join the Nightmare</h1>
            <p className="text-fog-gray">Create your account to start your horror journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-blood-red/10 border border-blood-red/20 rounded-lg p-3"
              >
                <p className="text-blood-red text-sm">{errors.general}</p>
              </motion.div>
            )}

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-fog-gray mb-3">Account Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleInputChange('role', 'CUSTOMER')}
                  className={`p-3 rounded-lg border-2 transition-all text-center ${
                    formData.role === 'CUSTOMER'
                      ? 'border-ecto-green bg-ecto-green/10 text-ecto-green'
                      : 'border-fog-gray/20 text-fog-gray hover:border-fog-gray/40'
                  }`}
                >
                  Customer
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange('role', 'ADMIN')}
                  className={`p-3 rounded-lg border-2 transition-all text-center ${
                    formData.role === 'ADMIN'
                      ? 'border-ecto-green bg-ecto-green/10 text-ecto-green'
                      : 'border-fog-gray/20 text-fog-gray hover:border-fog-gray/40'
                  }`}
                >
                  Admin
                </button>
              </div>
            </div>

            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-fog-gray" />
              <input
                type="text"
                placeholder="Full name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full pl-12 pr-4 py-3 bg-charcoal border rounded-lg text-white placeholder-fog-gray/50 focus:outline-none focus:ring-2 transition-colors ${
                  errors.name
                    ? 'border-blood-red focus:ring-blood-red/20'
                    : 'border-fog-gray/30 focus:border-ecto-green focus:ring-ecto-green/20'
                }`}
              />
              {errors.name && <p className="text-blood-red text-sm mt-1">{errors.name}</p>}
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-fog-gray" />
              <input
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full pl-12 pr-4 py-3 bg-charcoal border rounded-lg text-white placeholder-fog-gray/50 focus:outline-none focus:ring-2 transition-colors ${
                  errors.email
                    ? 'border-blood-red focus:ring-blood-red/20'
                    : 'border-fog-gray/30 focus:border-ecto-green focus:ring-ecto-green/20'
                }`}
              />
              {errors.email && <p className="text-blood-red text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-fog-gray" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`w-full pl-12 pr-12 py-3 bg-charcoal border rounded-lg text-white placeholder-fog-gray/50 focus:outline-none focus:ring-2 transition-colors ${
                  errors.password
                    ? 'border-blood-red focus:ring-blood-red/20'
                    : 'border-fog-gray/30 focus:border-ecto-green focus:ring-ecto-green/20'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-fog-gray hover:text-ecto-green"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              {errors.password && <p className="text-blood-red text-sm mt-1">{errors.password}</p>}
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-fog-gray" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className={`w-full pl-12 pr-12 py-3 bg-charcoal border rounded-lg text-white placeholder-fog-gray/50 focus:outline-none focus:ring-2 transition-colors ${
                  errors.confirmPassword
                    ? 'border-blood-red focus:ring-blood-red/20'
                    : 'border-fog-gray/30 focus:border-ecto-green focus:ring-ecto-green/20'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-fog-gray hover:text-ecto-green"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              {errors.confirmPassword && <p className="text-blood-red text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            {formData.role === 'ADMIN' && (
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-fog-gray" />
                <input
                  type="text"
                  placeholder="Admin invite code"
                  value={formData.inviteCode}
                  onChange={(e) => handleInputChange('inviteCode', e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 bg-charcoal border rounded-lg text-white placeholder-fog-gray/50 focus:outline-none focus:ring-2 transition-colors ${
                    errors.inviteCode
                      ? 'border-blood-red focus:ring-blood-red/20'
                      : 'border-fog-gray/30 focus:border-ecto-green focus:ring-ecto-green/20'
                  }`}
                />
                {errors.inviteCode && <p className="text-blood-red text-sm mt-1">{errors.inviteCode}</p>}
                <p className="text-fog-gray/70 text-xs mt-1">Demo code: FADED-ADMIN-2025</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <div className="text-fog-gray">
              Already have an account?{' '}
              <Link to="/login" className="text-ecto-green hover:underline">
                Sign in here
              </Link>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};