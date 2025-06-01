import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Input from '../ui/Input';
import Button from '../ui/Button';

const SignInForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const { login, isLoading, user } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
    
  //   if (!validate()) return;
    
  //   try {
  //     await login(email, password);
  //     navigate('/dashboard');
  //   } catch (error) {
  //     setErrors({ email: 'Invalid email or password' });
  //   }
  // };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validate()) return;

  try {
    await login(email, password);

    // Delay to ensure user is updated
    setTimeout(() => {
      if (user?.role === 'admin') {
        navigate('/dashboard'); // admin panel
      } else if (user?.role === 'client') {
        navigate('/client'); // client panel
      } else {
        navigate('/'); // fallback
      }
    }, 100);
  } catch (error) {
    setErrors({ email: 'Invalid email or password' });
  }
};


  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-enter">
      <Input
        id="email"
        type="email"
        label="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        placeholder="you@example.com"
        leftIcon={<Mail size={18} />}
        required
        autoComplete="email"
      />
      
      <Input
        id="password"
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        placeholder="••••••••"
        leftIcon={<Lock size={18} />}
        required
        autoComplete="current-password"
      />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            Remember me
          </label>
        </div>
        
        <div className="text-sm">
          <Link to="/forgot-password" className="text-primary-600 hover:text-primary-500">
            Forgot your password?
          </Link>
        </div>
      </div>
      
      <Button
        type="submit"
        variant="primary"
        isLoading={isLoading}
        className="w-full"
      >
        Sign in
      </Button>
      
      <div className="text-center text-sm">
        Don't have an account?{' '}
        <Link to="/signup" className="text-primary-600 hover:text-primary-500 font-medium">
          Sign up
        </Link>
      </div>
    </form>
  );
};

export default SignInForm;