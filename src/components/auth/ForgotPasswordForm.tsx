import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Mail, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import LoadingSpinner from '../layout/LoadingSpinner';
import { forgotPassword } from '../../store/slices/authSlice';
import type { ForgotPasswordDto } from '../../types/auth';
import { forgotPasswordSchema } from '@/lib/validation';

export default function ForgotPasswordForm() {
  const dispatch = useDispatch();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordDto>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordDto) => {
    try {
      await dispatch(forgotPassword(data.email)).unwrap();
    } catch (error) {
      // Error is handled in the slice
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="pl-10"
            {...register('email')}
          />
        </div>
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
        <p className="text-sm text-gray-600">
          We'll send you a link to reset your password.
        </p>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <LoadingSpinner size="sm" className="mr-2" />
            Sending...
          </>
        ) : (
          'Send Reset Link'
        )}
      </Button>

      <Link
        to="/login"
        className="flex items-center justify-center gap-2 text-sm text-primary hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to login
      </Link>
    </form>
  );
}