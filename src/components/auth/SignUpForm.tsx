import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Input from '../ui/Input';
import Button from '../ui/Button';

const SignUpForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    
    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    try {
      await signup(name, email, password);
      navigate('/dashboard');
    } catch (error) {
      setErrors({ email: 'Email is already taken' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-enter">
      <Input
        id="name"
        type="text"
        label="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name}
        placeholder="John Doe"
        leftIcon={<User size={18} />}
        required
        autoComplete="name"
      />
      
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
        autoComplete="new-password"
      />
      
      <Input
        id="confirmPassword"
        type="password"
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={errors.confirmPassword}
        placeholder="••••••••"
        leftIcon={<Lock size={18} />}
        required
        autoComplete="new-password"
      />
      
      <Button
        type="submit"
        variant="primary"
        isLoading={isLoading}
        className="w-full"
      >
        Create Account
      </Button>
      
      <div className="text-center text-sm">
        Already have an account?{' '}
        <Link to="/signin" className="text-primary-600 hover:text-primary-500 font-medium">
          Sign in
        </Link>
      </div>
    </form>
  );
};

export default SignUpForm;