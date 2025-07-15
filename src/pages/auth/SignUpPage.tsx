import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { signUpUser, clearError } from '@/store/slices/authSlice';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import { Card } from '@/components/ui';
import { SignUpInput } from '@/types';
import { DollarSign } from 'lucide-react';

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    loading,
    error: authError,
    isAuthenticated,
  } = useAppSelector((state) => state.auth);
  const [localError, setLocalError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>();

  useEffect(() => {
    // Clear any previous errors when component mounts
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    // Redirect to dashboard if already authenticated
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data: SignUpInput) => {
    try {
      setLocalError('');
      dispatch(clearError());
      console.log('Attempting sign up with:', data);

      const result = await dispatch(signUpUser(data));

      if (signUpUser.fulfilled.match(result)) {
        console.log('Sign up successful:', result.payload);
        // Navigate after a short delay to ensure state is updated
        setTimeout(() => {
          navigate('/dashboard');
        }, 100);
      } else {
        console.error('Sign up failed:', result.payload);
        setLocalError((result.payload as string) || 'Sign up failed');
      }
    } catch (err: any) {
      console.error('Sign up error:', err);
      setLocalError(err.message || 'Sign up failed');
    }
  };

  const displayError = localError || authError;

  const genderOptions = [
    { value: '', label: 'Select gender' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <DollarSign className="h-12 w-12 text-primary-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Create account</h2>
          <p className="mt-2 text-gray-600">
            Start tracking your expenses today
          </p>
        </div>

        {/* Form */}
        <Card>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {displayError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 text-sm">{displayError}</p>
              </div>
            )}

            <Input
              label="Username"
              type="text"
              {...register('username', { required: 'Username is required' })}
              error={errors.username?.message}
              placeholder="Choose a username"
            />

            <Input
              label="Full Name"
              type="text"
              {...register('name', { required: 'Name is required' })}
              error={errors.name?.message}
              placeholder="Enter your full name"
            />

            <Input
              label="Password"
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              error={errors.password?.message}
              placeholder="Create a password"
            />

            <Select
              label="Gender"
              options={genderOptions}
              {...register('gender', { required: 'Gender is required' })}
              error={errors.gender?.message}
            />

            <Button type="submit" className="w-full" loading={loading}>
              Create account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
